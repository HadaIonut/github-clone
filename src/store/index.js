// import Vuex from "vuex";
// import Vue from "vue";
import { createStore } from 'vuex'
import repos from "./modules/repos";
import user from "./modules/user";
import repoContents from './modules/repoContents';
import apiCalls from './modules/apiCalls';

// Vue.use(store);

export  const store = createStore({
  modules: {
    user,
    repos,
    repoContents,
    apiCalls
  },
});
