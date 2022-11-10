<template>
  <Grid v-if="!loading">
    <template #leftCol>
      <GameDate />
      <GameUser />
      <!--      $gameCredits-->
      <!--      <pre>{{ $gameCredits }}</pre>-->
      <!--      $gameModifiers-->
    </template>
    <template #rightCol>
      <GameCryptos />
      <GameModification />
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
    GameCryptos: () => import("./GameCrypto/GameCryptos"),
    GameModification: () => import("./GameModification/GameModification")
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
    tickGameData(gameData) {
      const { date, shares, cryptos, credits, modifiers } = gameData;
      console.error("tickGameData");
      console.log(gameData);
      this.$gameDate = date;
      this.$gameShares = shares;
      this.$gameCryptos = cryptos;
      this.$gameCryptos = cryptos;
      this.$gameCredits = credits;
      this.$gameModifiers = modifiers;
    },

    tickUserData(userData) {
      this.$gameUserData = userData;
    }
  }
};
</script>
