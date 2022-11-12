<template>
  <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th>Name</th>
          <th class="text-center">Count</th>
          <th class="text-center">Median</th>
          <th class="text-center">Current price</th>
          <th class="text-center">Grow/Loss</th>
          <th class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(crypto, index) in userCrypto" :key="index">
          <td width="10%">{{ crypto.name }}</td>
          <td width="10%" class="text-center">{{ crypto.count }}</td>
          <td width="15%" class="text-center">{{ crypto.median }} $</td>
          <td width="15%" class="text-center">{{ crypto.currentPrice }} $</td>
          <td width="15%" class="text-center">
            <v-chip
              :color="crypto.grow_loss > 0 ? 'green' : 'red'"
              text-color="white"
              label
              small
              style="height: 20px; width: 100%; display: flex; justify-content: center"
            >
              {{ crypto.grow_loss }} %
            </v-chip>
          </td>
          <td width="20%">
            <v-btn
              depressed
              color="green"
              class="mr-1"
              x-small
              @click="buy(crypto)"
            >
              Buy
            </v-btn>
            <v-btn depressed color="red" x-small @click="sell(crypto)">
              Sell
            </v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { $mChangePrise } from "@/utils/mathjs";

export default {
  name: "GameUserCrypto",

  computed: {
    userCrypto() {
      return this.$gameUserData.cryptos.map(crypto => {
        let { currentPrice } = this.$gameCryptos.find(
          c => c.name === crypto.name
        );
        return {
          ...crypto,
          currentPrice,
          grow_loss: $mChangePrise(currentPrice, crypto.median)
        };
      });
    }
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
