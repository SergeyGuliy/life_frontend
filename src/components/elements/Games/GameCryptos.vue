<template>
  <v-card class="GameUserData" v-if="cryptos?.length">
    <v-data-table
      :headers="cryptosHeaders"
      :items="localCryptos"
      :single-expand="false"
      :expanded.sync="expanded"
      item-key="name"
      show-expand
      dense
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Cryptos</v-toolbar-title>
        </v-toolbar>
      </template>
      <template v-slot:item.currentPrice="{ item }">
        {{ item.currentPrice.toFixed(2) }}
      </template>
      <template v-slot:item.grow_loss="{ item }">
        <v-chip
          :color="getChipColor(item)"
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
          <GameCryptoGraph :crypto="item" />
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
export default {
  name: "GameCryptos",

  props: {
    cryptos: {}
  },

  components: {
    GameCryptoGraph: () => import("./GameCryptoGraph")
  },

  computed: {
    localCryptos() {
      return this.cryptos.map(crypto => ({
        ...crypto,
        grow_loss: this.getPriceChange(crypto)
      }));
    }
  },

  data() {
    return {
      expanded: [],
      singleExpand: false,
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
    getPriceChange({ currentPrice, previousPrice }) {
      return +((currentPrice / previousPrice - 1) * 100).toFixed(2);
    },
    getChipColor(crypto) {
      return this.getPriceChange(crypto) > 0 ? "green" : "red";
    },

    buy() {},
    sell() {}
  }
};
</script>
