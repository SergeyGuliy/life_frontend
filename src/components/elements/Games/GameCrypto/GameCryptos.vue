<template>
  <v-card class="GameUserData" v-if="$gameCryptos && $gameCryptos.length">
    <v-data-table
      :headers="cryptosHeaders"
      :items="filteredCryptos"
      :single-expand="true"
      item-key="name"
      show-expand
      dense
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Cryptos</v-toolbar-title>
          <v-spacer />
          <v-text-field
            style="max-width: 120px"
            v-model="filterName"
            dense
            hide-details
            outlined
            prepend-inner-icon="mdi-filter"
          />
        </v-toolbar>
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
  </v-card>
</template>

<script>
export default {
  name: "GameCryptos",

  components: {
    GameCryptoGraph: () => import("./GameCryptoGraph"),
    ChipGrowLoss: () => import("../../../ui/game/ChipGrowLoss"),
    BuySellButtons: () => import("../../../ui/game/BuySellButtons")
  },

  computed: {
    filteredCryptos() {
      if (this.filterName) {
        return this.$gameCryptos.filter(({ name }) =>
          name.includes(this.filterName.toUpperCase())
        );
      }
      return this.$gameCryptos;
    }
  },

  data() {
    return {
      filterName: "",

      cryptosHeaders: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "Current Price", value: "currentPrice" },
        {
          text: "Grow/Loss",
          value: "grow_loss",
          align: "center",
          width: "110px"
        },
        {
          text: "Actions",
          value: "actions",
          align: "center",
          sortable: false,
          width: "135px"
        }
      ]
    };
  },

  methods: {
    async buy({ name }) {
      await this.$openModal("Game/CryptoBuySell", {
        type: "BUY",
        name
      }).catch(() => {});
    },
    async sell({ name }) {
      await this.$openModal("Game/CryptoBuySell", {
        type: "SELL",
        name
      }).catch(() => {});
    }
  }
};
</script>
