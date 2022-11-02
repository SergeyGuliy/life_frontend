<template>
  <Grid v-if="!loading">
    <template #leftCol>
      <GameDate />
      <GameUser />
      <pre></pre>
    </template>
    <template #rightCol>
      <GameCryptos />
    </template>
  </Grid>
</template>

<script>
import { api } from "@/utils/api";

export default {
  name: "Game",

  components: {
    GameDate: () => import("./GameDate"),
    GameUser: () => import("./GameUser/GameUser"),
    GameCryptos: () => import("./GameCrypto/GameCryptos")
  },

  data() {
    return {
      loading: true
    };
  },

  async $initSocketListener() {
    let req1 = api.games
      .getGameById(this.$gameId)
      .then(this.tickGameData)
      .then(() => {
        this.$socketInit({
          games_tick: this.tickGameData
        });
      });
    let req2 = api.games
      .getInGameUserData(this.$gameId)
      .then(this.tickUserData)
      .then(() => {
        this.$socketInit({
          games_sendUserData: this.tickUserData
        });
      });

    Promise.all([req1, req2]).then(() => {
      this.loading = false;
    });
  },

  methods: {
    tickGameData({ date, shares, cryptos }) {
      this.$gameDate = date;
      this.$gameShares = shares;
      this.$gameCryptos = cryptos;
    },

    tickUserData(userData) {
      this.$gameUserData = userData;
    }
  }
};
</script>

<style scoped></style>
