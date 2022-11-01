<template>
  <Grid>
    <template #leftCol>
      <GameDate :date="date" />
      <GameUser :userData="combinedUserData" />
      <pre></pre>
    </template>
    <template #rightCol>
      <GameCryptos :cryptos="cryptos" />
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

  props: {
    usersInRoom: {}
  },

  computed: {
    combinedUserData() {
      if (!this.userData) return;
      let { userId } = this.userData;
      const userData = this.usersInRoom.find(user => user.userId === userId);
      return {
        ...this.userData,
        userName: this.$f.getUserName(userData)
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
      .getGameById(this.$gameId)
      .then(this.tickGameData)
      .then(() => {
        this.$socketInit({
          games_tick: this.tickGameData
        });
      });
    api.games
      .getInGameUserData(this.$gameId)
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
