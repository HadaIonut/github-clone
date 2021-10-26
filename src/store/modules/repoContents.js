import { makeErrorToast } from '../../utils/toast';

const state = {
  repoContents: [],
  currentLocation: '',
  fileName: '',
  fileContent: '',
  commits: [],
  branches: [],
  collaboratos: [],
  languages: {},
  totalLanguages: 0,
};

const actions = {
  async fetchCollaborators({commit, getters}, {userName, repoName, context}){
    await this.dispatch('getCollaboratorsAction', {routeParams: {userName, repoName}})
    const collaborators = getters.CollaboratorsDataGetter;

    if (getters.CollaboratorsErrorGetter)
      makeErrorToast(context, getters.CollaboratorsErrorGetter.message || `Unable to fetch ${repoName}'collaborators`);
    else commit("setCollaborators", collaborators);
  },
  async fetchBranches({commit, getters}, {userName, repoName, context}){
    await this.dispatch('getBranchesAction', {routeParams: {userName, repoName}})
    const branches = getters.BranchesDataGetter;

    if (getters.BranchesErrorGetter)
      makeErrorToast(context, branches.error.message || `Unable to fetch ${repoName}'branches`);
    else commit("setBranches", branches);
  },
  async fetchCommits({commit}, {userName, repoName, context}){
    await this.dispatch('getCommitsAction', {routeParams: {userName, repoName}})
    const commits = this.state.magicStore.getCommitsEntry;

    if (commits.error)
      makeErrorToast(context, commits.error.message || `Unable to fetch ${repoName}'commits`);
    else commit("setCommits", commits.data);
  },
  async fetchRepoContents({ commit }, { userName, repoName, context }) {
    await this.dispatch('getContentsAction', {routeParams: {userName, repoName}})
    const contents = this.state.magicStore.getContentsEntry;
    contents.data.sort((a, b) => (a.type < b.type ? -1 : 1));
    if (contents.error)
      makeErrorToast(context, contents.error.message || `Unable to fetch ${repoName}'contents`);
    else commit("setRepoContents", contents.data);
  },
  async fetchRepoContentsAtLocation({ commit }, { userName, repoName, location, context }) {
    await this.dispatch('getLocationAction', {routeParams: {userName, repoName, location}})
    const dataAtLocation = this.state.magicStore.getLocationEntry;
    dataAtLocation.data.sort((a, b) => (a.type < b.type ? -1 : 1));

    if (dataAtLocation.error)
      makeErrorToast(context, dataAtLocation.error.message || `Unable to fetch ${repoName}'s contents`);
    else commit("setRepoContents", dataAtLocation.data);
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
    await this.dispatch('getLanguagesAction', {routeParams: {userName, repoName}})
    const languages = this.state.magicStore.getLanguagesEntry;

    if (languages.error)
      makeErrorToast(context, languages.error.message || `Unable to fetch ${repoName}'s languages`);
    else commit("setLanguages", languages.data);
  },
};

const getters = {
  allRepoContents: (state) => state.repoContents,
  getCurrentLocationAsString: (state) => state.currentLocation,
  getCurrentLocationAsArray: (state) => state.currentLocation.split('/'),
  getPathFromLocation: (state) => (location) => state.currentLocation.substr(0, location),
  getFileContent: (state) => state.fileContent,
  getFileName: (state) => state.fileName,
  getCommits: (state) => state.commits,
  getBranches: (state) => state.branches,
  getCollaborators: (state) => state.collaborators,
  getLanguages: (state) => state.languages,
  getTotalLanguages: (state) => Object.values(state.languages).reduce((acc, cur) => acc + cur, 0),
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
