import { makeErrorToast } from '../../utils/toast';

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
    await this.dispatch('getReposAction', {routeParams: {userName: username}})
    const repos = this.state.magicStore.getReposEntry;

    if (repos.error)
      makeErrorToast(context, repos.error.message || `Unable to fetch ${username}'s repositories`);
    else commit("setRepos", repos.data);
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
