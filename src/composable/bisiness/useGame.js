import { computed } from "vue";

import { API_userEvent } from "@api";
import { useStoreGame } from "@stores";
import { $mChangePrise } from "@helpers";

export function useGame() {
  const storeGame = useStoreGame();

  const gameCryptos = computed({
    get: () =>
      storeGame.gameCryptos.map((crypto) => ({
        ...crypto,
        grow_loss: $mChangePrise(crypto.currentPrice, crypto.previousPrice),
      })),
    set: (val) => storeGame.setGameCryptos(val),
  });

  const gameId = computed({
    get: () => storeGame.gameId,
    set: (val) => storeGame.setGameId(val),
  });

  const gameDate = computed({
    get: () => storeGame.gameDate,
    set: (val) => storeGame.setGameDate(val),
  });

  const gameShares = computed({
    get: () => storeGame.gameShares,
    set: (val) => storeGame.setGameShares(val),
  });

  const gameCredits = computed({
    get: () => storeGame.credits,
    set: (val) => storeGame.setGameCredits(val),
  });

  const gameDeposits = computed({
    get: () => storeGame.deposits,
    set: (val) => storeGame.setGameDeposits(val),
  });

  const gameModifiers = computed({
    get: () => storeGame.modifiers,
    set: (val) => storeGame.setGameModifiers(val),
  });

  const gameUserData = computed({
    get: () => storeGame.gameUserData,
    set: (val) => storeGame.setGameUserData(val),
  });

  const gameUserNews = computed({
    get: () => storeGame.gameUserNews,
    set: (val) => storeGame.setGameUserNews(val),
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
