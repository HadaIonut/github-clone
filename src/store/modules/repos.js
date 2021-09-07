import { Octokit } from "@octokit/core";

import { makeErrorToast } from "../../utils/toast";

const octokit = new Octokit();

const state = {
  repos: [],
};

const getters = {
  allRepos: (state) => state.repos,
};

const actions = {
  async fetchRepos({ commit }, username) {
    try {
      const repos = await octokit.request("GET /users/{username}/repos", {
        username,
      });

      commit("setRepos", repos.data);
    } catch (error) {
      makeErrorToast(
        error?.message || `Unable to fetch ${username}'s repositories`
      );
    }
  },
  updateRepos({ commit }, repos) {
    commit("setRepos", repos);
  },
};

const mutations = {
  setRepos: (state, repos) => (state.repos = repos),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
