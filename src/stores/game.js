import { defineStore } from "pinia";

export const useStoreGame = defineStore("game", {
  state: () => ({
    gameId: null,
    gameDate: null,
    gameShares: null,
    gameCryptos: null,
    gameUserData: null,
    gameUserNews: null,
    credits: null,
    deposits: null,
    modifiers: null,
  }),

  actions: {
    setGameId(gameId) {
      this.gameId = gameId;
    },
    setGameDate(gameDate) {
      this.gameDate = gameDate;
    },
    setGameShares(gameShares) {
      this.gameShares = gameShares;
    },
    setGameCryptos(gameCryptos) {
      this.gameCryptos = gameCryptos;
    },
    setGameCredits(credits) {
      this.credits = credits;
    },
    setGameDeposits(deposits) {
      this.deposits = deposits;
    },
    setGameModifiers(modifiers) {
      this.modifiers = modifiers;
    },
    setGameUserData(gameUserData) {
      this.gameUserData = gameUserData;
    },
    setGameUserNews(gameUserNews) {
      this.gameUserNews = gameUserNews;
    },
  },
});
