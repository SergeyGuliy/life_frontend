export default {
  namespaced: true,
  state: {
    gameId: null,
    gameDate: null,
    gameShares: null,
    gameCryptos: null,
    gameUserData: null,
    gameUserNews: null,
    credits: null,
    deposits: null,
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
    setGameDeposits(state, deposits) {
      state.deposits = deposits;
    },
    setGameModifiers(state, modifiers) {
      state.modifiers = modifiers;
    },
    setGameUserData(state, gameUserData) {
      state.gameUserData = gameUserData;
    },
    setGameUserNews(state, gameUserNews) {
      state.gameUserNews = gameUserNews;
    }
  }
};
