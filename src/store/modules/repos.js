import { Octokit } from '@octokit/core';

import { makeErrorToast } from '../../utils/toast';

const octokit = new Octokit();

const state = {
  repos: [],
  keyword: '',
};

const getters = {
  allRepos: (state) => state.repos,
  filteredRepos: (state) =>
    state.repos.filter((repo) =>
      repo.name.toLowerCase().includes(state.keyword.toLowerCase())
    ),
};

const actions = {
  async fetchRepos({ commit }, {username, context}) {
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
  updateKeyword({ commit }, keyword) {
    commit('setKeyword', keyword);
  },
};

const mutations = {
  setRepos: (state, repos) => (state.repos = repos),
  setKeyword: (state, keyword) => (state.keyword = keyword),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
