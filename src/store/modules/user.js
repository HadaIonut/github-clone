import { Octokit } from "@octokit/core";

const octokit = new Octokit();

const state = {
  user: null,
};

const getters = {
  getUser: (state) => state.user,
};

const actions = {
  async fetchUser({ commit }, username) {
    const user = await octokit.request('GET /users/{username}', {
      username
    })
  
    commit("setUser", user.data)
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
