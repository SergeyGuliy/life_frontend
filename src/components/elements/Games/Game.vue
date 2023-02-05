<template>
  <Grid v-if="!loading" class="game">
    <template #leftCol>
      <GameDate />
      <CollapsableBlocks :blocks="leftCol" />
    </template>
    <template #rightCol>
      <GameUser />
      <CollapsableBlocks :blocks="rightCol" />
    </template>
  </Grid>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { API_getGameById, API_getInGameUserData } from "@api/games";

export default {
  name: "Game",

  components: {
    GameDate: defineAsyncComponent(() => import("./GameDate.vue")),
    GameUser: defineAsyncComponent(() => import("./GameUser/GameUser.vue")),
    CollapsableBlocks: defineAsyncComponent(() =>
      import("../../ui/game/CollapsableBlocks.vue")
    ),
  },

  data() {
    return {
      loading: true,

      rightCol: {
        GameUserCrypto: "My crypto",
        GameUserCredits: "My credits",
        GameUserDeposits: "My deposits",
      },

      leftCol: {
        GameCryptos: "Crypto",
        GamesCredits: "Credits",
        GamesDeposits: "Deposits",
      },
    };
  },

  async $initSocketListener() {
    let req1 = API_getGameById(this.$gameId)
      .then(this.tickGameData)
      .then(() => {
        this.$socketInit({
          games_tick: this.tickGameData,
        });
      });
    let req2 = API_getInGameUserData(this.$gameId)
      .then(this.tickUserData)
      .then(() => {
        this.$socketInit({
          games_sendUserData: this.tickUserData,
        });
      });

    Promise.all([req1, req2]).then(() => {
      this.loading = false;
    });
  },

  methods: {
    tickGameData(gameData) {
      const { date, shares, cryptos, credits, modifiers, deposits } = gameData;

      this.$gameDate = date;
      this.$gameShares = shares;
      this.$gameCryptos = cryptos;
      this.$gameCryptos = cryptos;
      this.$gameCredits = credits;
      this.$gameDeposits = deposits;
      this.$gameModifiers = modifiers;
    },

    tickUserData({ userData, userNews }) {
      this.$gameUserData = userData;
      if (userNews) {
        this.$gameUserNews = userNews;
      }
    },
  },
};
</script>

<style lang="scss">
.game .v-data-table__wrapper {
  max-height: 200px;

  td,
  th {
    padding: 0 8px;
  }
}
</style>
