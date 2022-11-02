export default {
  namespaced: true,
  state: {
    gameId: null
  },
  mutations: {
    setGameId(state, gameId) {
      state.gameId = gameId;
    }
  }
};
