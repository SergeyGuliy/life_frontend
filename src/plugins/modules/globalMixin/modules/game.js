import { api } from "@/utils/api";
import { $mChangePrise } from "@/utils/mathjs";

export default {
  computed: {
    $gameId: {
      get() {
        return this.$store.state.game?.gameId;
      },
      set(val) {
        this.$store.commit("game/setGameId", val);
      }
    },
    $gameDate: {
      get() {
        return this.$store.state.game?.gameDate;
      },
      set(val) {
        this.$store.commit("game/setGameDate", val);
      }
    },
    $gameShares: {
      get() {
        return this.$store.state.game?.gameShares;
      },
      set(val) {
        this.$store.commit("game/setGameShares", val);
      }
    },
    $gameCryptos: {
      get() {
        return this.$store.state.game?.gameCryptos.map(crypto => ({
          ...crypto,
          grow_loss: $mChangePrise(crypto.currentPrice, crypto.previousPrice)
        }));
      },
      set(val) {
        this.$store.commit("game/setGameCryptos", val);
      }
    },
    $gameCredits: {
      get() {
        return this.$store.state.game?.credits;
      },
      set(val) {
        this.$store.commit("game/setGameCredits", val);
      }
    },
    $gameModifiers: {
      get() {
        return this.$store.state.game?.modifiers;
      },
      set(val) {
        console.log(val);
        this.$store.commit("game/setGameModifiers", val);
      }
    },
    $gameUserData: {
      get() {
        return this.$store.state.game?.gameUserData;
      },
      set(val) {
        this.$store.commit("game/setGameUserData", val);
      }
    },
    $gameUserCash() {
      return this.$store.state.game?.gameUserData.cash;
    },
    $gameUserWork: {
      get() {
        return this.$gameUserData?.work;
      },
      set(val) {
        this.$gameUserData.work = val;
      }
    }
  },

  methods: {
    $gameAction(actionModule, actionMethod, actionData = {}) {
      return api.games.userEvent({
        actionModule,
        actionMethod,
        gameId: this.$gameId,
        actionData
      });
    }
  }
};
