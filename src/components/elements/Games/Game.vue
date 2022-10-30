<template>
  <div>
    <pre>{{ date }}</pre>
    <pre>{{ shares }}</pre>
    <pre>{{ cryptos }}</pre>
    <pre></pre>
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
      date: null,
      shares: null,
      cryptos: null,

      userData: null
    };
  },

  async $initSocketListener() {
    api.games
      .getGameById(this.gameId)
      .then(this.tickGameData)
      .then(() => {
        this.$socketInit({
          games_tick: this.tickGameData
        });
      });
    api.games
      .getInGameUserData(this.gameId)
      .then(this.tickUserData)
      .then(() => {
        this.$socketInit({
          games_sendUserData: this.tickUserData
        });
      });
  },

  methods: {
    tickGameData({ date, shares, cryptos }) {
      this.date = date;
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
