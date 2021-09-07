import { Octokit } from "@octokit/core";

import { makeErrorToast } from "../../utils/toast";

const octokit = new Octokit();

const state = {
  user: null,
};

const getters = {
  getUser: (state) => state.user,
};

const actions = {
  async fetchUser({ commit }, username) {
    try {
      const user = await octokit.request("GET /users/{username}", {
        username,
      });

      commit("setUser", user.data);
    } catch (error) {
      makeErrorToast(
        error.message || `Unable to fetch ${username}'s github profile`
      );
    }
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
