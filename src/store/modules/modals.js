export default {
  namespaced: true,
  state: {
    data: {},
    component: null
  },
  getters: {},
  mutations: {
    SET_MODAL(state, { data, component }) {
      state.data = data;
      state.component = component;
    },
    CLOSE_MODAL(state) {
      state.data = {};
      state.component = null;
    }
  },
  actions: {
    setModal({ commit }, data) {
      commit("SET_MODAL", data);
    },
    closeModal({ commit }) {
      commit("CLOSE_MODAL");
    }
  }
};
