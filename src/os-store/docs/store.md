# Store

## Contributions

| Author       | Email | Change date |
| ------------ | ----- | ----------- |
| Radu Nedisan | -     | 02 Mar 2020 |

All calls to the API should be made through the store. There is a store entry factory in src/store/utils/storeService.js which should be used to create store entity entries in a store

## Example

```javascript
import {
  StoreCreator,
} from '@/store/utils/storeService';

const store = new StoreCreator({
  namespaced: true,
  // ...any other store config options
});

store.createGetEntry({
  resourceName: 'demo',
  initialValue: [],
  endpoint: '/api/demo',
  serializer: (response) => ({
    ...response,
    fullName: response.firstName + response.lastName
  }),
});

// Add as many entries as you need
store.createPutEntry({ ... });
store.createDeleteEntry({ ... });


// After adding all necessary entries:
export default store.createStore();
```

This will export an object that will look like this:

```javascript
{
  namespaced: true,
  state: { getDemoEntry },
  mutation: { getDemoMutation, getDemoResetMutation },
  action: { getDemoAction, getDemoResetAction }
}
```

## Explanation

The store entry is named based on the call `method`, `resourceName` and it's `role` in the store:

### 1. The resulting state entry will look like this:

```javascript
{
  state: {
    getDemoEntry: {
      data: [],
      loading: false,
      error: false,
    }
  }
}
```

When calling the api via it's respective `getDemoAction`, `loading` is set to `true` until we get a response, then `loading` is set to `false` again and the `data` or `error` is being updated, depending on the response.

Calling the `getDemoAction` returns a Promise.

### 2. Serializer

Defining a serializer will result in the `serializer` being called before the data is commited to the store

Example:

```javascript
store.createGetEntry({
  resourceName: 'users',
  initialValue: [],
  serializer: user => ({
    ...user,
    fullName: user.firstName + user.lastName,
  }),
  endpoint,
});
```

### 3. Route parameters

Example:

```javascript
'/api/users/:userId/friends/:friendId';
```

To populate the ids, the action (i.e. getDemoAction) can take a `routeParams` property which should look like this:

```javascript
routeParams = {
  userId: '1234',
  friendId: '5678',
};
```

### 4. Query parameters

Example:

```javascript
'/api/users?page=1&perPage=10';
```

To get this kind of query params url, the action (i.e. getDemoAction) can take a `queryParams` property which should look like this:

```javascript
queryParams = {
  page: 1,
  perPage: 10,
};
```

### 5. Request body

The action will take a `body` parameter containing the JSON to send to the API

### 6. Custom actions and mutations

During the request lifecycle, different standard actions and mutations are being called.
Use `customMutations` and `customActions` to call other actions at the end of the call. The serialized request response will be passed on. The action/mutation names should coincide with existing names:

Example:

```javascript
const store = new StoreCreator({
  namespaced: true,
  state: {
    lastItemLoaded: null,
  },

  mutations: {
    updateLastItemLoadedMutation(state, item) {
      state.lastItemLoaded = item;
    },
  },
});

store.createGetEntry({
  resourceName: 'items',
  endpoint,
  customMutations: ['updateLastItemLoadedMutation'],
});
```

To call actions/mutations across namespaced vuex modules, use the module namespace in front of the action/mutation:

```javascript
store.createGetEntry({
  resourceName: 'items',
  endpoint,
  customMutations: ['otherStoreNamespace/updateLastItemLoadedMutation'],
});
```

### 7.Multiple call protection

When we navigate through a menu and the navigation requires some calls to the API, if we navigate quickly enough or the internet is slow, we might end up having a queue of calls (the same call with different parameters) which can resolve in an uncontrolled order. As a result we might end up with content from page A on page B. To prevent this behavior, these store entries can be set up to only set in the store the result from the last call that has been made.

We are using the `keepOnlyLastCallResult` config to set up a call in this way. The default value is `false`

```javascript
const endpoint = '/items/:id';

store.createGetEntry({
  resourceName: 'items',
  endpoint,
  keepOnlyLastCallResult: true,
});
```

Calling synchronously or in quick succession

```javascript
getItemsAction({ routeParams: { id: 1 } });
getItemsAction({ routeParams: { id: 2 } });
getItemsAction({ routeParams: { id: 3 } });
```

will only save on `getItemsEntry` the response from

```javascript
getItemsAction({ routeParams: { id: 3 } });
```

and will ignore the responses from

```javascript
getItemsAction({ routeParams: { id: 1 } });
getItemsAction({ routeParams: { id: 2 } });
```

### 8. Store instances

Sometimes we want the functionality of the same store to be used in different circumstances, without reusing the same exact store. In those cases the same store module can be instantiated multiple times on different namespaces.

Since the storeCreator is essentially returning a config object, we can clone the same object multiple times on different namespaces. We do this by using lodash `cloneDeep` method.

Example in ([Store index.js](./frontend/src/store/index.js))

```javascript
import cloneDeep from 'lodash/cloneDeep';
import StoreModule from '@/store/modules/storeModule/store';

// simplified for brevity
const store = {
  modules: {
    storeModuleOne: cloneDeep(StoreModule),
    storeModuleTwo: cloneDeep(StoreModule),
    storeModuleThree: cloneDeep(StoreModule),
  },
};
```

When using mapActions, mapState etc. make sure to provide the correct namespace:

```javascript
{
  name: 'SomeVueComponent',
  methods: {
    ...mapActions('storeModuleTwo', {
      moduleTwoSomeAction: 'someAction'
    }),
    ...mapActions('storeModuleThree', {
      moduleThreeSomeAction: 'someAction'
    })
  }
}
```

### 9. Change base url

Base urls live in the config.json file which is fetched async from the server. Right now we have 2 base urls:

- platform base (will be deprecated at some point)
- api gateway

by default all endpoints fall back to `platform base`

to use the api gateway base simply do:

```javascript
store.createGetEntry({
  baseName: StoreCreator.BASE_NAMES.API_GATEWAY
  ...
});
```

### 10. 'storeResponseOnData'

Some store entry actions are only used to make calls and update a part of the vuex store, but the data on .data is never used.
In order to avoid bloating the store with unused data, we can set `storeResponseOnData` to `false`, to prevent the response from being store on `.data` and only use the `customMutations` or `customActions`
In doing so, `.fetched`, `.loading`, `.error` are still updated accordingly.

The default value of `storeResponseOnData` is `true`.
`.data`'s value will always be `undefined` even if `initialValue` is set.

Example:

```javascript
store.createGetEntry({
  resourceName: 'items',
  endpoint,
  customMutations: ['updateSomethingInStore'],
  customActions: ['updateSomethingInAnotherModule'],
  storeResponseOnData: false,
});
```

### TODO:

- handle lazy loading
- handle file upload/download
