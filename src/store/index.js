// import Vuex from "vuex";
// import Vue from "vue";
import { createStore } from 'vuex'
import repoContents from './modules/repoContents';
import magicStore from "./modules/magicStore";

// Vue.use(store);

export  const store = createStore({
  modules: {
    repoContents,
    magicStore
  },
});
