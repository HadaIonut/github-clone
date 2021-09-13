import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';

import Services from './services';

import { capitalize } from './utils';
import { sanitizeValues } from './helpers';
import { WS_SUBSCRIPTIONS } from './WSStoreService';

const { APIService, METHODS } = Services.Api;

class StoreCreator {
  constructor(storeConfig) {
    this.storeConfig = {
      actions: {},
      mutations: {},
      ...storeConfig,
      state: {
        ...storeConfig.state,
        [WS_SUBSCRIPTIONS]: [],
      },
    };
    this.apiService = new APIService();
  }

  createGetEntry = params => this.createApiStoreResource(params, METHODS.GET);

  createPostEntry = params => this.createApiStoreResource(params, METHODS.POST);

  createPutEntry = params => this.createApiStoreResource(params, METHODS.PUT);

  createPatchEntry = params =>
    this.createApiStoreResource(params, METHODS.PATCH);

  createDeleteEntry = params =>
    this.createApiStoreResource(params, METHODS.DELETE);

  createDownloadFileEntry = params =>
    this.createApiStoreResource(params, METHODS.DOWNLOAD);

  subscribeToWSEvent = ({
    group,
    action,
    resourceStoreName,
    initialValue,
    serializer,
    customActions,
    customMutations,
  }) => {
    this.storeConfig.state[WS_SUBSCRIPTIONS].push({
      group,
      action,
      serializer,
      customActions,
      customMutations,
    });

    this.storeConfig.state[resourceStoreName] = initialValue;

    this.storeConfig.mutations[action] = this.wsResourceMutationFactory(
      resourceStoreName
    );
  };

  createWSAction = ({ action, value }) => {
    const actionName = `${action}WSAction`;

    this.storeConfig.actions[actionName] = (context, data) => {
      const finalValue = data || value;

      context.commit(
        'ws/socketEmit',
        {
          action,
          value: finalValue,
        },
        { root: true }
      );
    };
  };

  createStore = () => this.storeConfig;

  createApiStoreResource = (
    {
      resourceName,
      endpoint,
      initialValue,
      serializer,
      errSerializer,
      customMutations,
      customActions,
      customHeaders,
      shouldSanitize = true,
    },
    method
  ) => {
    const resourceStoreName = `${method}${capitalize(resourceName)}Entry`;
    const mutationName = `${method}${capitalize(resourceName)}Mutation`;
    const resetMutationName = `${method}${capitalize(
      resourceName
    )}ResetMutation`;
    const actionName = `${method}${capitalize(resourceName)}Action`;
    const resetActionName = `${method}${capitalize(resourceName)}ResetAction`;

    this.storeConfig.state = {
      ...this.storeConfig.state,
      [resourceStoreName]: this.apiResourceFactory({ initialValue }),
    };

    this.storeConfig.mutations = {
      ...this.storeConfig.mutations,
      [mutationName]: this.apiResourceMutationFactory(resourceStoreName),
      [resetMutationName]: this.apiResourceResetMutationFactory(
        resourceStoreName,
        initialValue
      ),
    };

    this.storeConfig.actions = {
      ...this.storeConfig.actions,
      [actionName]: this.apiResourceActionFactory({
        endpoint,
        serializer,
        errSerializer,
        mutationName,
        resourceStoreName,
        method,
        customMutations,
        customActions,
        customHeaders,
        initialValue,
        shouldSanitize,
        actionName,
      }),
      [resetActionName]: this.apiResourceResetActionFactory({
        mutationName: resetMutationName,
      }),
    };
  };

  apiResourceActionFactory = ({
    customMutations = [],
    customActions = [],
    endpoint,
    resourceStoreName,
    customHeaders = {},
    serializer = data => data,
    errSerializer = data => data,
    mutationName,
    method,
    initialValue,
    shouldSanitize,
    actionName,
  }) => async (context, payload = {}) => {
    const {
      queryParams,
      routeParams,
      body,
      requestType,
      headers = {},
      fileName,
    } = payload;

    const requestConfig = {
      endpoint,
      queryParams,
      routeParams,
      body,
      method,
      requestType,
      headers: { ...customHeaders, ...headers },
      fileName,
    };

    context.commit(mutationName, {
      loading: true,
      error: false,
    });

    return this.createRequest({
      requestConfig,
      serializer,
      context,
      resourceStoreName,
      mutationName,
      customMutations,
      customActions,
      errSerializer,
      initialValue,
      shouldSanitize,
      actionName,
    });
  };

  createRequest({
    requestConfig,
    serializer,
    context,
    resourceStoreName,
    mutationName,
    customMutations,
    customActions,
    errSerializer,
    initialValue,
    shouldSanitize,
    actionName,
  }) {
    return this.apiService
      .makeRequest(requestConfig)
      .then(response => {
        const successPayload = {
          loading: false,
          fetched: true,
          error: false,
          data: undefined,
        };

        if (requestConfig.method !== METHODS.DOWNLOAD) {
          try {
            successPayload.data = shouldSanitize
              ? sanitizeValues(serializer(response.data))
              : serializer(response.data);
          } catch (err) {
            console.error(err);
            successPayload.error = true;
            successPayload.data = initialValue;
          }
        }

        context.commit(mutationName, successPayload);
        customMutations.forEach(name => {
          // Calls a mutation from any store module
          // customMutations should look like this:
          // ['module/mutationName']
          if (name.indexOf('/') > 0) {
            context.commit(name, successPayload.data, { root: true });
          } else {
            context.commit(name, successPayload.data);
          }
        });
        customActions.forEach(name => {
          // Calls an action from any store module
          // customActions should look like this:
          // ['module/actionName']
          if (name.indexOf('/') > 0) {
            context.dispatch(name, successPayload.data, { root: true });
          } else {
            context.dispatch(name, successPayload.data);
          }
        });

        return response;
      })
      .catch(async err => {
        const errStatus = get(err, ['response', 'status'], 500);
        // todo move urls in constants
        if (errStatus === 401 && requestConfig.endpoint !== '/api/signin/') {
          try {
            const { shouldContinue } = await this.handleSessionExpiredError({
              context,
              requestConfig,
              actionName,
            });

            if (!shouldContinue) {
              return {};
            }
          } catch (e) {
            window.location.reload();
          }
        }

        const errPayload = {
          loading: false,
          fetched: context.state[resourceStoreName].fetched,
          error: {
            code: errStatus,
          },
        };

        try {
          errPayload.error.data = sanitizeValues(
            errSerializer(get(err, ['response', 'data'], err))
          );
        } catch {
          console.error(err);
          // TODO: check if "null" can be changed with a specific message
          errPayload.error.data = null;
        }

        context.commit(mutationName, errPayload);
        customMutations.forEach(name => {
          // Calls a mutation from any store module
          // customMutations should look like this:
          // ['module/mutationName']
          if (name.indexOf('/') > 0) {
            context.commit(name, initialValue, { root: true });
          } else {
            context.commit(name, initialValue);
          }
        });
        customActions.forEach(name => {
          // Calls an action from any store module
          // customActions should look like this:
          // ['module/actionName']
          if (name.indexOf('/') > 0) {
            context.dispatch(name, initialValue, { root: true });
          } else {
            context.dispatch(name, initialValue);
          }
        });

        return errPayload;
      });
  }

  handleSessionExpiredError = async ({
    context,
    requestConfig,
    actionName,
  }) => {
    await context.dispatch('auth/checkSession', requestConfig, {
      root: true,
    });

    if (
      requestConfig.endpoint !== '/api/me' &&
      requestConfig.endpoint !== '/api/logout/' &&
      !context.rootState.auth.sessionCheckStarted
    ) {
      context.dispatch(actionName, requestConfig);
      return { shouldContinue: false };
    }

    return { shouldContinue: true };
  };

  apiResourceResetActionFactory = ({ mutationName }) => context => {
    context.commit(mutationName);
  };

  apiResourceFactory = ({ initialValue = null }) => ({
    data: cloneDeep(initialValue),
    loading: false,
    fetched: false,
    error: false,
  });

  apiResourceMutationFactory = resourceStoreName =>
    function mutation(state, mutationData) {
      state[resourceStoreName] = {
        ...state[resourceStoreName],
        ...mutationData,
      };
    };

  wsResourceMutationFactory = resourceStoreName =>
    function mutation(state, { data }) {
      state[resourceStoreName] = data;
    };

  apiResourceResetMutationFactory = (resourceStoreName, initialValue = null) =>
    function mutation(state) {
      state[resourceStoreName] = {
        data: cloneDeep(initialValue),
        error: false,
        loading: false,
        fetched: false,
      };
    };
}

export { StoreCreator };
