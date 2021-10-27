
const state = {
  currentLocation: '',
  fileName: '',
};

const actions = {
  updateCurrentLocation({ commit }, newLocation) {
    commit('setCurrentLocation', newLocation);
  },
  updateFileName({ commit }, name) {
    commit('setFileName', name);
  },
};

const getters = {
  getCurrentLocationAsString: (state) => state.currentLocation,
  getCurrentLocationAsArray: (state) => state.currentLocation.split('/'),
  getPathFromLocation: (state) => (location) => state.currentLocation.substr(0, location),
  getFileName: (state) => state.fileName,
  getLanguages: (state) => state.languages,
};

const mutations = {
  setCurrentLocation: (state, newLocation) =>
    (state.currentLocation = newLocation),
  setFileName: (state, name) => (state.fileName = name),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
