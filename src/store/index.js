import Vuex from "vuex";
import Vue from "vue";
import repos from "./modules/repos";
import user from "./modules/user";
import repoContents from './modules/repoContents';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    repos,
    repoContents
  },
});
