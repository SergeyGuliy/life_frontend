<template>
  <div>
    <v-simple-table dense fixed-header v-if="userCredits.length">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">Duration<br />(month)</th>
            <th class="text-center">End</th>
            <th class="text-center">Percent</th>
            <th class="text-center">Amount</th>
            <th class="text-center">Month pay</th>
            <th class="text-center">Total pay</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(credit, index) in userCredits" :key="index">
            <td width="16%" class="text-center">{{ credit.duration }}</td>
            <td width="20%" class="text-center">
              {{ getGameDate(credit.end) }}
            </td>
            <td width="16%" class="text-center">{{ credit.percent }} %</td>
            <td width="16%" class="text-center">{{ credit.cash }} $</td>
            <td width="16%" class="text-center">{{ credit.perMonth }} $</td>
            <td width="16%" class="text-center">{{ credit.total }} $</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-card-subtitle v-else class="text-center py-0">
      You don't have credits
    </v-card-subtitle>
  </div>
</template>

<script setup>
import { computed } from "vue";

import { useGame } from "@composable";
import { getGameDate } from "@helpers";
const { gameUserData } = useGame();

const userCredits = computed(() => gameUserData.value.credits);
</script>

<style scoped></style>
