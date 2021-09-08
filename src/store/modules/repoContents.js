import {Octokit} from '@octokit/core';

import {makeErrorToast} from '../../utils/toast';

const octokit = new Octokit();

const state = {
  repoContents: [],
};

const actions = {
  async fetchRepoContents({commit}, {userName, repoName}) {
    try {
      const docs = (await octokit.request(`GET /repos/${userName}/${repoName}/contents`)).data;
      commit('setRepoContents', docs);
    } catch (error) {
      makeErrorToast(
        error.message || `Unable to fetch ${repoName}'s contents`
      );
    }
  },
  async fetchRepoContentsAtLocation({commit}, {userName, repoName, location}) {
    try {
      const docs = (await octokit.request(`GET /repos/${userName}/${repoName}/contents/${location}`)).data;
      commit('setRepoContents', docs);
    } catch (error) {
      makeErrorToast(
        error.message || `Unable to fetch ${repoName}'s contents`
      );
    }
  }
};

const getters = {
  allRepoContents: (state) => state.repoContents,
};

const mutations = {
  setRepoContents: (state, repoContents) => state.repoContents = repoContents
};

export default {
  state,
  getters,
  actions,
  mutations,
};
