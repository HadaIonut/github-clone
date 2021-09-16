import { makeErrorToast } from "../../utils/toast";

const state = {
  user: null,
};

const getters = {
  getUser: (state) => state.user,
};

const actions = {
  async fetchUser({ commit }, {username, context}) {
    await this.dispatch('getUserDetailsAction', {routeParams: {userName: username}})
    const userDetails = this.state.apiCalls.getUserDetailsEntry;

    if (userDetails.error)
      makeErrorToast(context, userDetails.error.message || `Unable to fetch ${username}'s github profile`);
    else commit("setUser", userDetails.data);
  },
  updateUser({ commit }, user) {
    commit("setUser", user);
  },
  resetUser({ commit }) {
    commit("setUser", null);
  },
};

const mutations = {
  setUser: (state, user) => (state.user = user),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
