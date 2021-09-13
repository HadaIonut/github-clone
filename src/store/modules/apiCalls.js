import StoreCreator from '../../os-store';

const store = new StoreCreator({
  namespaced: false,
  // ...any other store config options
});

console.log(store);

store.createGetEntry({
  resourceName: 'demo',
  // customHeaders: {
  //   'Access-Control-Allow-Origin':'*'
  // },
  initialValue: [],
  endpoint: 'https://api.github.com/users/HadaIonut',
  serializer: (response) => ({
    ...response,
  }),
});

export default store.createStore();
