import { Octokit } from '@octokit/core';

import { makeErrorToast } from '../../utils/toast';

const octokit = new Octokit();

const state = {
  repoContents: [],
  currentLocation: '',
  fileName: '',
  fileContent: '',
  commits: [],
  branches: [],
  collaboratos: [],
  languages: {},
};

const actions = {
  async fetchCollaborators({commit}, {userName, repoName, context}){
    try {
      const collaborators = (
        await octokit.request(`GET /repos/${userName}/${repoName}/branches`)
      ).data;
      commit('setCollaborators', collaborators);
    } catch (error) {
      makeErrorToast(
        context,
        error.message || `Unable to fetch ${repoName}'collaborators`
      );
    }
  },
  async fetchBranches({commit}, {userName, repoName, context}){
    try {
      const branches = (
        await octokit.request(`GET /repos/${userName}/${repoName}/branches`)
      ).data;
      commit('setBranches', branches);
    } catch (error) {
      makeErrorToast(
        context,
        error.message || `Unable to fetch ${repoName}'branches`
      );
    }
  },
  async fetchCommits({commit}, {userName, repoName, context}){
    try {
      const commits = (
        await octokit.request(`GET /repos/${userName}/${repoName}/commits`)
      ).data;
      commit('setCommits', commits);
    } catch (error) {
      makeErrorToast(
        context,
        error.message || `Unable to fetch ${repoName}'commits`
      );
    }

  },
  async fetchRepoContents({ commit }, { userName, repoName, context }) {
    try {
      const docs = (
        await octokit.request(`GET /repos/${userName}/${repoName}/contents`)
      ).data;
      commit('setRepoContents', docs);
    } catch (error) {
      makeErrorToast(
        context,
        error.message || `Unable to fetch ${repoName}'s contents`
      );
    }
  },
  async fetchRepoContentsAtLocation(
    { commit },
    { userName, repoName, location, context }
  ) {
    try {
      const docs = (
        await octokit.request(
          `GET /repos/${userName}/${repoName}/contents/${location}`
        )
      ).data;
      commit('setRepoContents', docs);
    } catch (error) {
      makeErrorToast(
        context,
        error.message || `Unable to fetch ${repoName}'s contents`
      );
    }
  },
  updateCurrentLocation({ commit }, newLocation) {
    commit('setCurrentLocation', newLocation);
  },
  updateFileContent({ commit }, content) {
    commit('setContent', content);
  },
  updateFileName({ commit }, name) {
    commit('setFileName', name);
  },
  async fetchLanguages({ commit }, { userName, repoName, context }) {
    try {
      const languages = (
        await octokit.request(`GET /repos/${userName}/${repoName}/languages`)
      ).data;
      commit('setLanguages', languages);
    } catch (error) {
      makeErrorToast(
        context,
        error.message || `Unable to fetch ${repoName}'s languages`
      );
    }
  },
};

const getters = {
  allRepoContents: (state) => state.repoContents,
  getCurrentLocationAsString: (state) => state.currentLocation,
  getCurrentLocationAsArray: (state) => state.currentLocation.split('/'),
  getPathFromLocation: (state) => (location) =>
    state.currentLocation.substr(0, location),
  getFileContent: (state) => state.fileContent,
  getFileName: (state) => state.fileName,
  getCommits: (state) => state.commits,
  getBranches: (state) => state.branches,
  getCollaborators: (state) => state.collaborators,
  getLanguages: (state) => state.languages,
};

const mutations = {
  setRepoContents: (state, repoContents) => (state.repoContents = repoContents),
  setCurrentLocation: (state, newLocation) =>
    (state.currentLocation = newLocation),
  setContent: (state, content) => (state.fileContent = content),
  setFileName: (state, name) => (state.fileName = name),
  setCommits: (state, commits) => (state.commits = commits),
  setBranches: (state, branches) => (state.branches = branches),
  setCollaborators: (state, collaborators) => (state.collaborators = collaborators),

  setLanguages: (state, languages) => (state.languages = languages),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
