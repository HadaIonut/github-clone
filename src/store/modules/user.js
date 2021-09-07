const state = {
  user: null,
};

const getters = {
  getUser: (state) => state.user,
};

const actions = {
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
