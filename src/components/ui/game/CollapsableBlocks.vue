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
import { defineAsyncComponent } from "vue";

export default {
  name: "collapsableBlocks",

  components: {
    GameCryptos: defineAsyncComponent(() =>
      import("../../elements/Games/GameCrypto/GameCryptos.vue")
    ),
    GameUserCredits: () =>
      import("../../elements/Games/GameUser/GameUserCredits.vue"),
    GameUserDeposits: defineAsyncComponent(() =>
      import("../../elements/Games/GameUser/GameUserDeposits.vue")
    ),
    GameUserCrypto: defineAsyncComponent(() =>
      import("../../elements/Games/GameUser/GameUserCrypto.vue")
    ),
    GamesCredits: defineAsyncComponent(() =>
      import("../../elements/Games/GamesCreditsDeposits/GamesCredits.vue")
    ),
    GamesDeposits: defineAsyncComponent(() =>
      import("../../elements/Games/GamesCreditsDeposits/GamesDeposits.vue")
    ),
  },

  props: {
    blocks: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      activeBlock: [],
    };
  },
};
</script>

<style lang="scss">
.game .v-expansion-panel-content .v-expansion-panel-content__wrap {
  padding-left: 5px;
  padding-right: 5px;
}
</style>
