export default {
  namespaced: true,
  state: {
    locale: null,
    location: null,
  },
  getters: {
    // isLoggedIn: state => !!state.user
  },
  mutations: {
    // eslint-disable-next-line no-unused-vars
    setUser(state, { userData, accessToken, refreshToken }) {},
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    async setUserData({ commit }, data) {}
  }
};
