import {Octokit} from '@octokit/core';

import {makeErrorToast} from '../../utils/toast';

const octokit = new Octokit();

const state = {
  repoContents: [],
  currentLocation: ''
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
  },
  setCurrentLocation({commit}, newLocation) {
    commit('setCurrentLocation', newLocation)
  }
};

const getters = {
  allRepoContents: (state) => state.repoContents,
  getCurrentLocationAsString: (state) => state.currentLocation,
  getCurrentLocationAsArray: (state) => state.currentLocation.split('/')
};

const mutations = {
  setRepoContents: (state, repoContents) => state.repoContents = repoContents,
  setCurrentLocation: (state, newLocation) => state.currentLocation = newLocation
};

export default {
  state,
  getters,
  actions,
  mutations,
};
