export default {
  namespaced: true,
  state: {
    gameId: null,
    gameDate: null,
    gameShares: null,
    gameCryptos: null,
    gameUserData: null
  },
  mutations: {
    setGameId(state, gameId) {
      state.gameId = gameId;
    },
    setGameDate(state, gameDate) {
      state.gameDate = gameDate;
    },
    setGameShares(state, gameShares) {
      state.gameShares = gameShares;
    },
    setGameCryptos(state, gameCryptos) {
      state.gameCryptos = gameCryptos;
    },
    setGameUserData(state, gameUserData) {
      state.gameUserData = gameUserData;
    }
  }
};
