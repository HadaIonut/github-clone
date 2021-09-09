import { Octokit } from '@octokit/core';

import { makeErrorToast } from '../../utils/toast';

const octokit = new Octokit();

const state = {
  repos: [],
  keyword: '',
  fileName: '',
  fileContent: '',
};

const getters = {
  allRepos: (state) => state.repos,
  filteredRepos: (state) =>
    state.repos.filter((repo) =>
      repo.name.toLowerCase().includes(state.keyword.toLowerCase())
    ),
  getFileContent: (state) => state.fileContent,
  getFileName: (state) => state.fileName,
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
  updateKeyword({ commit }, keyword) {
    commit('setKeyword', keyword);
  },
  updateFileContent({ commit }, content) {
    commit('setContent', content);
  },
  updateFileName({ commit }, name) {
    commit('setFileName', name);
  },
};

const mutations = {
  setRepos: (state, repos) => (state.repos = repos),
  setKeyword: (state, keyword) => (state.keyword = keyword),
  setContent: (state, content) => (state.fileContent = content),
  setFileName: (state, name) => (state.fileName = name),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
