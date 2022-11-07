export default {
  namespaced: true,
  state: {
    gameId: null,
    gameDate: null,
    gameShares: null,
    gameCryptos: null,
    gameUserData: null,
    credits: null,
    modifiers: null
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
    setGameCredits(state, credits) {
      state.credits = credits;
    },
    setGameModifiers(state, modifiers) {
      state.modifiers = modifiers;
    },
    setGameUserData(state, gameUserData) {
      state.gameUserData = gameUserData;
    }
  }
};
