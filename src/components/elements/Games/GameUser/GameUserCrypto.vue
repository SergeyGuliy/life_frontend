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
            <chipGrowLoss :growLoss="crypto.grow_loss" />
          </td>
          <td width="20%">
            <buySellButtons :item="crypto" />
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

  components: {
    chipGrowLoss: () => import("../../../ui/game/chipGrowLoss"),
    buySellButtons: () => import("../../../ui/game/buySellButtons")
  },

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
  }
};
</script>
