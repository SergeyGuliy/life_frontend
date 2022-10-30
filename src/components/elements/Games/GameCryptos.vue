<template>
  <v-card class="GameUserData" v-if="cryptos?.length">
    <v-card-title class="py-0">
      Cryptos
    </v-card-title>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th>Name</th>
            <th>Current Price</th>
            <th>Grow/Loss</th>
            <th class="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(crypto, index) in cryptos" :key="index">
            <td>{{ crypto.name }}</td>
            <td>{{ crypto.currentPrice.toFixed(4) }}</td>
            <td>
              <v-chip
                :color="getChipColor(crypto)"
                text-color="white"
                label
                small
              >
                {{ getPriceChange(crypto) }} %
              </v-chip>
            </td>
            <td class="text-right">
              <v-btn depressed color="green" class="mr-1" small>
                Buy
              </v-btn>
              <v-btn depressed color="red" small>
                Sell
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
export default {
  name: "GameCryptos",

  props: {
    cryptos: {}
  },

  methods: {
    getPriceChange({ currentPrice, previousPrice }) {
      return +((currentPrice / previousPrice - 1) * 100).toFixed(2);
    },
    getChipColor(crypto) {
      return this.getPriceChange(crypto) > 0 ? "green" : "red";
    }
  }
};
</script>
