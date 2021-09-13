import Vuex from "vuex";
import Vue from "vue";
import repos from "./modules/repos";
import user from "./modules/user";
import repoContents from './modules/repoContents';
import apiCalls from './modules/apiCalls';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    repos,
    repoContents,
    apiCalls
  },
});
