import StoreCreator from '../../os-store';
import {BASE, ENDPOINTS} from '../../../constants/routes';

const store = new StoreCreator({
  namespaced: false,
  // ...any other store config options
});

store.createGetEntry({
  resourceName: 'userDetails',
  initialValue: [],
  endpoint: `${BASE}/${ENDPOINTS['userDetails']}`,
  serializer: (response) => ({
    ...response,
  }),
});

store.createGetEntry({
  resourceName: 'repos',
  initialValue: [],
  endpoint: `${BASE}/${ENDPOINTS['repos']}`,
  serializer: (response) => ([
      ...response,
  ]),
});

store.createGetEntry({
  resourceName: 'collaborators',
  initialValue: [],
  endpoint: `${BASE}/${ENDPOINTS['collaborators']}`,
  serializer: (response) => ({
    ...response,
  }),
});

store.createGetEntry({
  resourceName: 'branches',
  initialValue: [],
  endpoint: `${BASE}/${ENDPOINTS['branches']}`,
  serializer: (response) => ([
    ...response,
  ]),
});

store.createGetEntry({
  resourceName: 'commits',
  initialValue: [],
  endpoint: `${BASE}/${ENDPOINTS['commits']}`,
  serializer: (response) => ([
    ...response,
  ]),
});

store.createGetEntry({
  resourceName: 'contents',
  initialValue: [],
  endpoint: `${BASE}/${ENDPOINTS['contents']}`,
  serializer: (response) => ([
    ...response,
  ]),
});

store.createGetEntry({
  resourceName: 'languages',
  initialValue: [],
  endpoint: `${BASE}/${ENDPOINTS['languages']}`,
  serializer: (response) => ({
      ...response,
  }),
});

store.createGetEntry({
  resourceName: 'location',
  initialValue: [],
  endpoint: `${BASE}/${ENDPOINTS['location']}`,
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
