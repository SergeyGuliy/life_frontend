<template>
  <v-card class="GameDate" v-if="$gameDate">
    <v-card-title class="py-0">
      Current date:
      <v-spacer></v-spacer>
      {{ getDate }}
    </v-card-title>

    <v-card-actions>
      <v-btn @click="skipRound" block>
        Pause
      </v-btn>
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
    }
  },

  methods: {
    skipRound() {}
  }
};
</script>
