import axios from "axios";

export let store = {}

const initFields = () => {
  store['state'] = {}
  store['actions'] = {}
  store['mutations'] = {}
  store['getters'] = {}
}

export const createStore = () => {
  initFields();
}

const parseEndPoint = (rawURL, {routeParams, queryParams}) => {
  const parsedUrl = rawURL.replace(/:([\w]+)/g, (_, match) => routeParams[match]);
  if (queryParams) {
    const stringifiedQueryParams = Object.keys(queryParams).reduce(
      (acc, current) => `${acc}&${current}=${queryParams[current]}`, '').substring(1);
    return `${parsedUrl}?${stringifiedQueryParams}`
  }
  return `${parsedUrl}`
}

const getAction = (resourceName, rawUrl, serializer) => ({commit}, params) => {
  console.log(commit)
  axios({
    method: 'get',
    url: parseEndPoint(rawUrl, params),
    responseType: 'stream'
  }).then((response) => {
    const responseData = typeof serializer === 'function' ? serializer(response.data) : response.data;
    commit(`get${resourceName}commit`, responseData)
  }).catch(e => {
    commit(`get${resourceName}ErrorCommit`, {...e}?.response?.data || {...e})
  })
}

const getMutation = (resourceName, type) => (state, payload) => {
  state[`get${resourceName}Entry`][type] = payload
}

export const addRoute = ({resourceName, initialValue, endPoint, serializer}) => {
  resourceName = resourceName.charAt(0).toUpperCase() + resourceName.slice(1);
  store.state[`get${resourceName}Entry`] = {
    data: initialValue,
    error: false
  };
  store.actions[`get${resourceName}`] = getAction(resourceName, endPoint, serializer);
  store.mutations[`get${resourceName}commit`] = getMutation(resourceName, 'data');
  store.mutations[`get${resourceName}ErrorCommit`] = getMutation(resourceName, 'error');
}