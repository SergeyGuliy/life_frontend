<template>
  <v-data-table
    v-if="gameCryptos && gameCryptos.length"
    :headers="cryptosHeaders"
    :items="filteredCryptos"
    :single-expand="true"
    item-key="name"
    show-expand
    dense
    hide-default-footer
    fixed-header
  >
    <template v-slot:top>
      <v-text-field
        v-model="filterName"
        append-inner-icon="mdi-magnify"
        label="Search"
        single-line
        outlined
        dense
        hide-details
      ></v-text-field>
    </template>
    <template v-slot:item.grow_loss="{ item }">
      <ChipGrowLoss :growLoss="item.grow_loss" />
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <GameCryptoGraph :crypto="item" :key="item.name" />
      </td>
    </template>
    <template v-slot:item.actions="{ item }">
      <BuySellButtons :item="item" />
    </template>
  </v-data-table>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { useGame } from "../../../../composable/useGame";

export default {
  name: "GameCryptos",

  setup() {
    const { gameCryptos } = useGame();
    return { gameCryptos };
  },

  components: {
    GameCryptoGraph: defineAsyncComponent(() =>
      import("./GameCryptoGraph.vue")
    ),
    ChipGrowLoss: defineAsyncComponent(() =>
      import("../../../ui/game/ChipGrowLoss.vue")
    ),
    BuySellButtons: defineAsyncComponent(() =>
      import("../../../ui/game/BuySellButtons.vue")
    ),
  },

  computed: {
    filteredCryptos() {
      if (this.filterName) {
        return this.gameCryptos.filter(({ name }) =>
          name.includes(this.filterName.toUpperCase())
        );
      }
      return this.gameCryptos;
    },
  },

  data() {
    return {
      filterName: "",

      cryptosHeaders: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name",
        },
        {
          text: "Current Price",
          value: "currentPrice",
        },
        {
          text: "Grow/Loss",
          value: "grow_loss",
          align: "center",
          width: "110px",
        },
        {
          text: "Actions",
          value: "actions",
          align: "center",
          sortable: false,
          width: "135px",
        },
      ],
    };
  },
};
</script>
