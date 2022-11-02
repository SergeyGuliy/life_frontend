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
        return this.$store.state.game?.gameCryptos;
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
  }
};
