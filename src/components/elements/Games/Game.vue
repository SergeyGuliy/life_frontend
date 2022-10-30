<template>
  <Grid>
    <template #leftCol>
      <GameDate :date="date" />
      <GameUserData :userData="combinedUserData" />
      <GameCryptos :cryptos="cryptos" />
      <pre></pre>
    </template>
    <template #rightCol> </template>
  </Grid>
</template>

<script>
import { api } from "@/utils/api";

export default {
  name: "Game",

  components: {
    GameDate: () => import("./GameDate"),
    GameUserData: () => import("./GameUserData"),
    GameCryptos: () => import("./GameCryptos")
  },

  props: {
    gameId: {},
    usersInRoom: {}
  },

  computed: {
    combinedUserData() {
      if (!this.userData) return;
      let { userId } = this.userData;
      const userData = this.usersInRoom.find(user => user.userId === userId);
      return {
        ...this.userData,
        userName: this.$filters.getUserName(userData)
      };
    }
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
