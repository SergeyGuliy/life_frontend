<template>
  <div>
    <v-simple-table dense fixed-header v-if="userDeposits.length">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">Duration<br />(month)</th>
            <th class="text-center">End</th>
            <th class="text-center">Percent</th>
            <th class="text-center">Amount</th>
            <th class="text-center">Month income</th>
            <th class="text-center">Total income</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(deposit, index) in userDeposits" :key="index">
            <td width="16%" class="text-center">{{ deposit.duration }}</td>
            <td width="20%" class="text-center">
              {{ getGameDate(deposit.end) }}
            </td>
            <td width="16%" class="text-center">{{ deposit.percent }} %</td>
            <td width="16%" class="text-center">{{ deposit.cash }} $</td>
            <td width="16%" class="text-center">{{ deposit.perMonth }} $</td>
            <td width="16%" class="text-center">{{ deposit.total }} $</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-card-subtitle v-else class="text-center py-0">
      You don't have deposits
    </v-card-subtitle>
  </div>
</template>

<script setup>
import { computed } from "vue";

import { useGame } from "@composable";
import { getGameDate } from "@helpers";
const { gameUserData } = useGame();

const userDeposits = computed(() => gameUserData.value.deposits);
</script>

<style scoped></style>
