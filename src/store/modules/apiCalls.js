import StoreCreator from '../../os-store';

const store = new StoreCreator({
  namespaced: false,
  // ...any other store config options
});

store.createGetEntry({
  resourceName: 'demo',
  initialValue: [],
  endpoint: 'https://api.github.com/users/:userName',
  serializer: (response) => ({
    ...response,
  }),
});

export default store.createStore();
