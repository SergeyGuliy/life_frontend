<template>
  <div>
    <v-simple-table dense v-if="userCrypto.length">
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
              <ChipGrowLoss :growLoss="crypto.grow_loss" />
            </td>
            <td width="22%">
              <BuySellButtons :item="crypto" />
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-card-subtitle v-else class="text-center py-0">
      You don't have cryptos
    </v-card-subtitle>
  </div>
</template>

<script setup>
import ChipGrowLoss from "../../../ui/game/ChipGrowLoss.vue";
import BuySellButtons from "../../../ui/game/BuySellButtons.vue";

import { useGame } from "@composable";
const { gameUserData, gameCryptos } = useGame();

import { $mChain } from "@utils/mathjs";
import { computed } from "vue";

const userCrypto = computed(() => {
  return gameUserData.value.cryptos.map((crypto) => {
    let { currentPrice } = gameCryptos.value.find(
      (c) => c.name === crypto.name
    );
    return {
      ...crypto,
      currentPrice,
      grow_loss: $mChain((currentPrice / crypto.median) * 100 - 100)
        .round(2)
        .done(),
    };
  });
});
</script>
