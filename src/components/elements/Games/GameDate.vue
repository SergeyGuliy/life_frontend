<template>
  <v-card class="GameDate" v-if="$gameDate">
    <v-card-title class="py-0">
      Current date:
      <v-spacer></v-spacer>
      {{ $gameDate | gameDate }}
    </v-card-title>

    <v-card-actions>
      <v-btn @click="votePause" color="orange" width="50%">
        Vote for pause
      </v-btn>
      <v-btn @click="skipRound" color="red" width="50%"> Skip round </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "GameDate",

  computed: {
    getDate() {
      const { monthCode, year } = this.$gameDate;
      return `${monthCode} ${year}`;
    },
  },

  methods: {
    votePause() {},
    skipRound() {},
  },
};
</script>
