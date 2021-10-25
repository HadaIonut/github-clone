import axios from "axios";

export let store = {}

const initFields = ({mutations, actions, getters}) => {
  store['state'] = {}
  store['actions'] = {
    ...actions
  }
  store['mutations'] = {
    ...mutations
  }
  store['getters'] = {
    ...getters
  }
}

export const createStore = (customOperations) => initFields(customOperations);

const parseEndPoint = (rawURL, {routeParams, queryParams}) => {
  const parsedUrl = rawURL.replace(/:([\w]+)/g, (_, match) => routeParams[match]);
  const stringifiedQueryParams = Object.keys(queryParams || {}).reduce(
    (acc, current) => `${acc}&${current}=${queryParams[current]}`, '').substring(1);

  return queryParams ? `${parsedUrl}?${stringifiedQueryParams}` : `${parsedUrl}`
}

const callCustomEvents = (customEvents, responseData, toCall) => {
  customEvents?.forEach?.((customEvent) => {
    toCall(customEvent, responseData)
  })
}

const getAction = (resourceName, rawUrl, serializer, customActions, customMutations) =>
  async ({commit, dispatch}, params) => {
    try {
      const response = await axios({
        method: 'get',
        url: parseEndPoint(rawUrl, params),
      })
      const responseData = typeof serializer === 'function' ? serializer(response.data) : response.data;
      commit(`get${resourceName}commit`, responseData)

      callCustomEvents(customActions, responseData, dispatch)
      callCustomEvents(customMutations, responseData, commit)
    } catch (e) {
      commit(`get${resourceName}ErrorCommit`, {...e}?.response?.data || {...e})
    }
  }

const getMutation = (resourceName, type) => (state, payload) => {
  state[`get${resourceName}Entry`][type] = payload
}

export const addRoute = ({resourceName, initialValue, endPoint, serializer, customActions, customMutations}) => {
  resourceName = resourceName.charAt(0).toUpperCase() + resourceName.slice(1);
  store.state[`get${resourceName}Entry`] = {
    data: initialValue,
    error: false
  };
  store.actions[`get${resourceName}`] = getAction(resourceName, endPoint, serializer, customActions, customMutations);
  store.mutations[`get${resourceName}commit`] = getMutation(resourceName, 'data');
  store.mutations[`get${resourceName}ErrorCommit`] = getMutation(resourceName, 'error');
}