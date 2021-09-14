import StoreCreator from '../../os-store';

const store = new StoreCreator({
  namespaced: false,
  // ...any other store config options
});

const BASE = 'https://api.github.com'

store.createGetEntry({
  resourceName: 'userDetails',
  initialValue: [],
  endpoint: `${BASE}/users/:userName`,
  serializer: (response) => ({
    ...response,
  }),
});

store.createGetEntry({
  resourceName: 'repos',
  initialValue: [],
  endpoint: `${BASE}/users/:userName/repos`,
  serializer: (response) => ([
      ...response,
  ]),
});

store.createGetEntry({
  resourceName: 'collaborators',
  initialValue: [],
  endpoint: `${BASE}/repos/:userName/:repoName/collaborators`,
  serializer: (response) => ({
    ...response,
  }),
});

store.createGetEntry({
  resourceName: 'branches',
  initialValue: [],
  endpoint: `${BASE}/repos/:userName/:repoName/branches`,
  serializer: (response) => ([
    ...response,
  ]),
});

store.createGetEntry({
  resourceName: 'commits',
  initialValue: [],
  endpoint: `${BASE}/repos/:userName/:repoName/commits`,
  serializer: (response) => ([
    ...response,
  ]),
});

store.createGetEntry({
  resourceName: 'contents',
  initialValue: [],
  endpoint: `${BASE}/repos/:userName/:repoName/contents`,
  serializer: (response) => ([
    ...response,
  ]),
});

store.createGetEntry({
  resourceName: 'languages',
  initialValue: [],
  endpoint: `${BASE}/repos/:userName/:repoName/languages`,
  serializer: (response) => ({
      ...response,
  }),
});

store.createGetEntry({
  resourceName: 'location',
  initialValue: [],
  endpoint: `${BASE}/repos/:userName/:repoName/contents/:location`,
  serializer: (response) => ([
    ...response,
  ]),
});

store.createGetEntry({
  resourceName: 'fileContent',
  initialValue: [],
  endpoint: ':url',
  serializer: (response) => response,
});

export default store.createStore();
