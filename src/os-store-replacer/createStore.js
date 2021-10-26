import axios from "axios";

export let store = {}
// const noDataMethods = ['get', 'delete', 'head', 'options'];
const dataMethods = ['post', 'put', 'patch']

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

const callCustomEvents = async (customEvents, responseData, toCall) => {
  for (const customEvent of customEvents) {
    await toCall(customEvent, responseData)
  }
}

const getAction = (type, resourceName, rawUrl, serializer, customActions, customMutations) =>
  async ({commit, dispatch}, routeParams, dataParams) => {
    try {
      const response = await axios({
        method: type,
        url: parseEndPoint(rawUrl, routeParams),
        ...(dataMethods.includes(type) && {data: dataParams})
      })
      const responseData = typeof serializer === 'function' ? serializer(response.data) : response.data;
      commit(`${type}${resourceName}Commit`, responseData)

      await callCustomEvents(customActions, responseData, dispatch)
      await callCustomEvents(customMutations, responseData, commit)
    } catch (e) {
      commit(`${type}${resourceName}ErrorCommit`, {...e}?.response?.data || {...e})
    }
  }


const getMutation = (resourceName, type, method) => (state, payload) => {
  state[`${method}${resourceName}Entry`][type] = payload
}

const addRoute = (type, {resourceName, initialValue, endPoint, serializer, customActions, customMutations}) => {
  resourceName = resourceName.charAt(0).toUpperCase() + resourceName.slice(1);
  store.state[`${type}${resourceName}Entry`] = {
    data: initialValue,
    error: false
  };
  store.actions[`${type}${resourceName}`] = getAction(type, resourceName, endPoint, serializer, customActions, customMutations);
  store.mutations[`${type}${resourceName}Commit`] = getMutation(resourceName, 'data', type);
  store.mutations[`${type}${resourceName}ErrorCommit`] = getMutation(resourceName, 'error', type);
}

export const addGetRoute = (data) => addRoute('get', data);
