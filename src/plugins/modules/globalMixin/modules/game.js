export default {
  computed: {
    $gameId: {
      get() {
        return this.$store.state.user?.gameId;
      },
      set(val) {
        this.$store.commit("user/setGameId", val);
      }
    }
  }
};
