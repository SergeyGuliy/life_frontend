<template>
  <v-card class="GameDate" v-if="gameDate">
    <v-card-title class="py-0">
      Current date:
      <v-spacer></v-spacer>
      {{ $filters.gameDate(gameDate) }}
    </v-card-title>

    <v-card-actions>
      <v-btn @click="votePause" color="orange" width="50%">
        Vote for pause
      </v-btn>
      <v-btn @click="skipRound" color="red" width="50%"> Skip round </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { useGame } from "../../../composable/useGame";

const { gameDate } = useGame();

function votePause() {}
function skipRound() {}
</script>
