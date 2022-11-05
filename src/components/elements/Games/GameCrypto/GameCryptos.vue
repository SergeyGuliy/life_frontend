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
      <template v-slot:item.currentPrice="{ item }">
        {{ getCurrentPrice(item.currentPrice) }}
      </template>
      <template v-slot:item.grow_loss="{ item }">
        <v-chip
          :color="item.grow_loss > 0 ? 'green' : 'red'"
          text-color="white"
          label
          small
          style="height: 20px; width: 100%; display: flex; justify-content: center"
        >
          {{ item.grow_loss }} %
        </v-chip>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <GameCryptoGraph :crypto="item" :key="item.name" />
        </td>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn depressed color="green" class="mr-1" x-small @click="buy(item)">
          Buy
        </v-btn>
        <v-btn depressed color="red" x-small @click="sell(item)">
          Sell
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { createNumber } from "@/utils/createNumber";

export default {
  name: "GameCryptos",

  components: {
    GameCryptoGraph: () => import("./GameCryptoGraph")
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
    getCurrentPrice(currentPrice) {
      return createNumber(currentPrice)
        .round()
        .getPrice();
    },

    async buy({ name }) {
      await this.$openModal("Game/Crypto/BuySell", {
        type: "BUY",
        name
      }).catch(() => {});
    },
    async sell({ name }) {
      await this.$openModal("Game/Crypto/BuySell", {
        type: "SELL",
        name
      }).catch(() => {});
    }
  }
};
</script>
