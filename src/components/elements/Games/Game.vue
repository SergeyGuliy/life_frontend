<template>
  <div>
    <pre>{{ game }}</pre>
    <pre>{{ userData }}</pre>
  </div>
</template>

<script>
import { api } from "@/utils/api";

export default {
  name: "Game",

  props: {
    gameId: {}
  },

  data() {
    return {
      game: null,
      userData: null
    };
  },

  $initSocketListener() {
    api.games.getGameById(this.gameId).then(game => {
      this.game = game;
      this.$socketInit({
        games_tick: this.tickGameData,
        games_sendUserData: this.tickUserData
      });
    });
  },

  computed: {
    currentDate: {
      get() {
        return this.game?.gameData?.currentDate;
      },
      set(val) {
        this.game.gameData.currentDate = val;
      }
    },
    shares: {
      get() {
        return this.game?.shares;
      },
      set(val) {
        this.game.shares = val;
      }
    },
    cryptos: {
      get() {
        return this.game?.cryptos;
      },
      set(val) {
        this.game.cryptos = val;
      }
    }
  },

  methods: {
    tickGameData({ currentDate, shares, cryptos }) {
      this.currentDate = currentDate;
      this.shares = shares;
      this.cryptos = cryptos;
    },

    tickUserData(userData) {
      this.userData = userData;
    }
  }
};
</script>

<style scoped></style>
