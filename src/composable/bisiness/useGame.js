import { computed } from "vue";

import { API_userEvent } from "@api";
import { useStoreGame } from "@stores";
import { $mChangePrise } from "@utils/mathjs";

export function useGame() {
  const store = useStoreGame();

  const gameCryptos = computed({
    get: () =>
      store.gameCryptos.map((crypto) => ({
        ...crypto,
        grow_loss: $mChangePrise(crypto.currentPrice, crypto.previousPrice),
      })),
    set: (val) => store.setGameCryptos(val),
  });

  const gameId = computed({
    get: () => store.gameId,
    set: (val) => store.setGameId(val),
  });

  const gameDate = computed({
    get: () => store.gameDate,
    set: (val) => store.setGameDate(val),
  });

  const gameShares = computed({
    get: () => store.gameShares,
    set: (val) => store.setGameShares(val),
  });

  const gameCredits = computed({
    get: () => store.credits,
    set: (val) => store.setGameCredits(val),
  });

  const gameDeposits = computed({
    get: () => store.deposits,
    set: (val) => store.setGameDeposits(val),
  });

  const gameModifiers = computed({
    get: () => store.modifiers,
    set: (val) => store.setGameModifiers(val),
  });

  const gameUserData = computed({
    get: () => store.gameUserData,
    set: (val) => store.setGameUserData(val),
  });

  const gameUserNews = computed({
    get: () => store.gameUserNews,
    set: (val) => store.setGameUserNews(val),
  });

  const gameUserWork = computed({
    get: () => gameUserData.value?.work,
    set: (val) => (gameUserData.value.work = val),
  });

  const gameUserCash = computed(() => gameUserData.value.cash);

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
