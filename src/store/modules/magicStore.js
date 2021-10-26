import {addGetRoute,  createStore, store} from '../../os-store-replacer/createStore'
import {BASE, ENDPOINTS} from "../../../constants/routes";

createStore({});

addGetRoute({
    resourceName: 'userDetails',
    initialValue: [],
    endpoint: `${BASE}/${ENDPOINTS['userDetails']}`,
    serializer: (response) => ({
        ...response,
    }),
});

addGetRoute({
    resourceName: 'repos',
    initialValue: [],
    endpoint: `${BASE}/${ENDPOINTS['repos']}`,
    serializer: (response) => ([
        ...response,
    ]),
});

addGetRoute({
    resourceName: 'collaborators',
    initialValue: [],
    endpoint: `${BASE}/${ENDPOINTS['collaborators']}`,
    serializer: (response) => ({
        ...response,
    }),
});

addGetRoute({
    resourceName: 'branches',
    initialValue: [],
    endpoint: `${BASE}/${ENDPOINTS['branches']}`,
    serializer: (response) => ([
        ...response,
    ]),
});

addGetRoute({
    resourceName: 'commits',
    initialValue: [],
    endpoint: `${BASE}/${ENDPOINTS['commits']}`,
    serializer: (response) => ([
        ...response,
    ]),
});

addGetRoute({
    resourceName: 'contents',
    initialValue: [],
    endpoint: `${BASE}/${ENDPOINTS['contents']}`,
    serializer: (response) => ([
        ...response,
    ]),
});

addGetRoute({
    resourceName: 'languages',
    initialValue: [],
    endpoint: `${BASE}/${ENDPOINTS['languages']}`,
    serializer: (response) => ({
        ...response,
    }),
});

addGetRoute({
    resourceName: 'location',
    initialValue: [],
    endpoint: `${BASE}/${ENDPOINTS['location']}`,
    serializer: (response) => ([
        ...response,
    ]),
});

addGetRoute({
    resourceName: 'fileContent',
    initialValue: '',
    endpoint: ':url',
    serializer: (response) => response,
});

addGetRoute({
    resourceName: 'userList',
    initialValue: [],
    endpoint: `https://api.github.com/search/users`,
    serializer: (response) =>  response,
});

export default store;