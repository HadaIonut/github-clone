import Vuex from 'vuex';
import Vue from 'vue';
import { APIService } from '../src/services/apiService';
import { StoreCreator } from '../src/storeService';

Vue.use(Vuex);

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const buildStore = storeModule => {
  const store = new Vuex.Store({
    modules: {
      module: storeModule.createStore(),
    },
  });

  return store;
};

const makeRequestSuccessful = (data = {}) =>
  jest
    .spyOn(APIService.prototype, 'makeRequest')
    .mockImplementation(() => Promise.resolve({ data }));

const makeRequestFailed = (err = new Error()) =>
  jest
    .spyOn(APIService.prototype, 'makeRequest')
    .mockImplementation(() => Promise.reject(err));

afterAll(() => {
  jest.restoreAllMocks();
});

describe('storeService', () => {
  describe('fetched flag', () => {
    ['get', 'put', 'post', 'delete'].forEach(httpVerb => {
      it(`should be false by default for create${capitalizeFirstLetter(
        httpVerb
      )}Entry`, () => {
        const storeModule = new StoreCreator({});
        storeModule[`create${capitalizeFirstLetter(httpVerb)}Entry`]({
          resourceName: 'resource',
          initialValue: null,
          endpoint: '',
          serializer: data => data,
        });

        const store = buildStore(storeModule);

        expect(store.state.module[`${httpVerb}ResourceEntry`].fetched).toBe(
          false
        );
      });
    });

    ['get', 'put', 'post', 'delete'].forEach(httpVerb => {
      it(`should be true after a successful ${httpVerb}ResourceAction`, async () => {
        makeRequestSuccessful();

        const storeModule = new StoreCreator({});
        storeModule[`create${capitalizeFirstLetter(httpVerb)}Entry`]({
          resourceName: 'resource',
          initialValue: null,
          endpoint: '',
          serializer: data => data,
        });

        const store = buildStore(storeModule);

        await store.dispatch(`${httpVerb}ResourceAction`);

        expect(store.state.module[`${httpVerb}ResourceEntry`].fetched).toBe(
          true
        );
      });
    });

    ['get', 'put', 'post', 'delete'].forEach(httpVerb => {
      it(`should be false after a failed ${httpVerb}ResourceAction`, async () => {
        makeRequestFailed();

        const storeModule = new StoreCreator({});
        storeModule[`create${capitalizeFirstLetter(httpVerb)}Entry`]({
          resourceName: 'resource',
          initialValue: null,
          endpoint: '',
          serializer: data => data,
        });

        const store = buildStore(storeModule);

        await store.dispatch(`${httpVerb}ResourceAction`);

        expect(store.state.module[`${httpVerb}ResourceEntry`].fetched).toBe(
          false
        );
      });
    });

    ['get', 'put', 'post', 'delete'].forEach(httpVerb => {
      it(`should be true after a successful followed by a failed ${httpVerb}ResourceAction`, async () => {
        const storeModule = new StoreCreator({});
        storeModule[`create${capitalizeFirstLetter(httpVerb)}Entry`]({
          resourceName: 'resource',
          initialValue: null,
          endpoint: '',
          serializer: data => data,
        });

        const store = buildStore(storeModule);

        makeRequestSuccessful();
        await store.dispatch(`${httpVerb}ResourceAction`);
        makeRequestFailed();
        await store.dispatch(`${httpVerb}ResourceAction`);

        expect(store.state.module[`${httpVerb}ResourceEntry`].fetched).toBe(
          true
        );
      });
    });

    ['get', 'put', 'post', 'delete'].forEach(httpVerb => {
      it(`should be true after a failed followed by a successful ${httpVerb}ResourceAction`, async () => {
        const storeModule = new StoreCreator({});
        storeModule[`create${capitalizeFirstLetter(httpVerb)}Entry`]({
          resourceName: 'resource',
          initialValue: null,
          endpoint: '',
          serializer: data => data,
        });

        const store = buildStore(storeModule);

        makeRequestFailed();
        await store.dispatch(`${httpVerb}ResourceAction`);
        makeRequestSuccessful();
        await store.dispatch(`${httpVerb}ResourceAction`);

        expect(store.state.module[`${httpVerb}ResourceEntry`].fetched).toBe(
          true
        );
      });
    });
  });
});
