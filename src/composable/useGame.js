import { API_userEvent } from "../utils/api/modules/games";
import { useStoreGame } from "../stores/game";
import { computed } from "vue";
import { $mChangePrise } from "@utils/mathjs";

export function useGame() {
  const store = useStoreGame();

  const gameId = computed({
    get() {
      return store.gameId;
    },
    set(val) {
      store.setGameId(val);
    },
  });

  const gameDate = computed({
    get() {
      return store.gameDate;
    },
    set(val) {
      store.setGameDate(val);
    },
  });

  const gameShares = computed({
    get() {
      return store.gameShares;
    },
    set(val) {
      store.setGameShares(val);
    },
  });

  const gameCryptos = computed({
    get() {
      return store.gameCryptos.map((crypto) => ({
        ...crypto,
        grow_loss: $mChangePrise(crypto.currentPrice, crypto.previousPrice),
      }));
    },
    set(val) {
      store.setGameCryptos(val);
    },
  });

  const gameCredits = computed({
    get() {
      return store.credits;
    },
    set(val) {
      store.setGameCredits(val);
    },
  });

  const gameDeposits = computed({
    get() {
      return store.deposits;
    },
    set(val) {
      store.setGameDeposits(val);
    },
  });

  const gameModifiers = computed({
    get() {
      return store.modifiers;
    },
    set(val) {
      store.setGameModifiers(val);
    },
  });

  const gameUserData = computed({
    get() {
      return store.gameUserData;
    },
    set(val) {
      store.setGameUserData(val);
    },
  });

  const gameUserNews = computed({
    get() {
      return store.gameUserNews;
    },
    set(val) {
      store.setGameUserNews(val);
    },
  });

  const gameUserWork = computed({
    get() {
      return gameUserData.value?.work;
    },
    set(val) {
      gameUserData.value.work = val;
    },
  });

  const gameUserCash = computed(() => {
    return gameUserData.value.cash;
  });

  function gameAction(actionModule, actionMethod, actionData = {}) {
    return API_userEvent({
      actionModule,
      actionMethod,
      gameId: gameId.value,
      actionData,
    });
  }

  return {
    gameId,
    gameDate,
    gameShares,
    gameCryptos,
    gameCredits,
    gameDeposits,
    gameModifiers,
    gameUserNews,
    gameUserWork,
    gameUserData,
    gameUserCash,

    gameAction,
  };
}
