import { api } from "@/utils/api";
import { createNumber } from "@/utils/createNumber";

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
          grow_loss: getPriceChange(crypto)
        }));
      },
      set(val) {
        this.$store.commit("game/setGameCryptos", val);
      }
    },
    $gameUserData: {
      get() {
        return this.$store.state.game?.gameUserData;
      },
      set(val) {
        this.$store.commit("game/setGameUserData", val);
      }
    }
  },

  methods: {
    $gameAction(actionModule, actionMethod, actionData) {
      return api.games.userEvent({
        actionModule,
        actionMethod,
        actionData: {
          ...actionData,
          gameId: this.$gameId
        }
      });
    }
  }
};

function getPriceChange({ currentPrice, previousPrice }) {
  return createNumber(currentPrice / previousPrice)
    .changePrise()
    .round()
    .getNum();
}
