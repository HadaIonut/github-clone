import { Octokit } from '@octokit/core';

import { makeErrorToast } from '../../utils/toast';

const octokit = new Octokit();

const state = {
  repos: [],
};

const getters = {
  allRepos: (state) => state.repos,
  filteredRepos: (state) => (keyword) =>
    state.repos.filter((repo) =>
      repo.name.toLowerCase().includes(keyword.toLowerCase())
    ),
};

const actions = {
  async fetchRepos({ commit }, { username, context }) {
    try {
      const repos = await octokit.request('GET /users/{username}/repos', {
        username,
      });

      commit('setRepos', repos.data);
    } catch (error) {
      makeErrorToast(
        context,
        error.message || `Unable to fetch ${username}'s repositories`
      );
    }
  },
  updateRepos({ commit }, repos) {
    commit('setRepos', repos);
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
