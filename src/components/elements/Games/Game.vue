<template>
  <Grid v-if="!loading">
    <template #leftCol>
      <GameDate />
      <GameUser />

      <v-expansion-panels v-model="leftPanel">
        <v-expansion-panel v-for="([component, label], i) in leftCol" :key="i">
          <v-expansion-panel-header>{{ label }}</v-expansion-panel-header>
          <v-expansion-panel-content class="px-0">
            <component :is="component" />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </template>
    <template #rightCol>
      <v-expansion-panels v-model="rightPanel">
        <v-expansion-panel v-for="([component, label], i) in rightCol" :key="i">
          <v-expansion-panel-header>{{ label }}</v-expansion-panel-header>
          <v-expansion-panel-content class="px-0">
            <component :is="component" />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
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
    GameUserCredits: () => import("./GameUser/GameUserCredits"),
    GameUserDeposits: () => import("./GameUser/GameUserDeposits"),
    GameUserCrypto: () => import("./GameUser/GameUserCrypto"),
    GameCryptos: () => import("./GameCrypto/GameCryptos"),
    GameModification: () => import("./GameModification/GameModification"),
    GamesCredits: () => import("./GamesCreditsDeposits/GamesCredits"),
    GamesDeposits: () => import("./GamesCreditsDeposits/GamesDeposits")
  },

  data() {
    return {
      loading: true,

      leftPanel: 0,
      leftCol: Object.entries({
        GameUserCrypto: "My crypto",
        GameUserDeposits: "My deposits",
        GameUserCredits: "My credits"
      }),

      rightPanel: 1,
      rightCol: Object.entries({
        GameCryptos: "Crypto",
        GamesCredits: "Credits",
        GamesDeposits: "Deposits",
        GameModification: "Modification"
      })
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
      const { date, shares, cryptos, credits, modifiers, deposits } = gameData;
      console.error("tickGameData");
      console.log(gameData);
      this.$gameDate = date;
      this.$gameShares = shares;
      this.$gameCryptos = cryptos;
      this.$gameCryptos = cryptos;
      this.$gameCredits = credits;
      this.$gameDeposits = deposits;
      this.$gameModifiers = modifiers;
    },

    tickUserData(userData) {
      this.$gameUserData = userData;
    }
  }
};
</script>

<style lang="scss">
.v-expansion-panel-content .v-expansion-panel-content__wrap {
  padding-left: 5px;
  padding-right: 5px;
}
</style>
