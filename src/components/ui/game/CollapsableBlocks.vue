<template>
  <v-expansion-panels v-model="activeBlock" accordion multiple>
    <v-expansion-panel
      v-for="([component, label], i) in Object.entries(blocks)"
      :key="i"
    >
      <v-expansion-panel-header>{{ label }}</v-expansion-panel-header>
      <v-expansion-panel-content class="px-0">
        <component :is="component" />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: "collapsableBlocks",

  components: {
    GameUserCredits: () =>
      import("../../elements/Games/GameUser/GameUserCredits"),
    GameUserDeposits: () =>
      import("../../elements/Games/GameUser/GameUserDeposits"),
    GameUserCrypto: () =>
      import("../../elements/Games/GameUser/GameUserCrypto"),
    GameCryptos: () => import("../../elements/Games/GameCrypto/GameCryptos"),
    GameModification: () =>
      import("../../elements/Games/GameModification/GameModification"),
    GamesCredits: () =>
      import("../../elements/Games/GamesCreditsDeposits/GamesCredits"),
    GamesDeposits: () =>
      import("../../elements/Games/GamesCreditsDeposits/GamesDeposits")
  },

  props: {
    blocks: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      activeBlock: []
    };
  }
};
</script>

<style lang="scss">
.game .v-expansion-panel-content .v-expansion-panel-content__wrap {
  padding-left: 5px;
  padding-right: 5px;
}
</style>
