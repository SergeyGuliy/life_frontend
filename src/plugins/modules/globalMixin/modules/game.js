export default {
  computed: {
    $gameId: {
      get() {
        return this.$store.state.game?.gameId;
      },
      set(val) {
        this.$store.commit("game/setGameId", val);
      }
    }
  }
};
