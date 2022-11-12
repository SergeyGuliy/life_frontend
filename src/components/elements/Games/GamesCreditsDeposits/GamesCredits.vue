<template>
  <v-card class="GamesCredits" v-if="$gameCredits">
    <v-card-title class="py-0">
      Game credits
      <v-spacer></v-spacer>
      Last updated: {{ getDate }}
    </v-card-title>

    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th>Duration</th>
            <th class="text-center">Percent</th>
            <th class="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(credit, index) in $gameCredits.credits" :key="index">
            <td width="28%">{{ credit.duration }} month</td>
            <td width="28%" class="text-center">{{ credit.percent }} %</td>
            <td class="text-right">
              <v-btn
                depressed
                color="green"
                class="mr-1"
                x-small
                @click="takeCredit(credit)"
              >
                Take credit
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
  name: "GamesCredits",

  computed: {
    getDate() {
      const { monthCode, year } = this.$gameCredits.lastRecalculation;
      return `${monthCode} ${year}`;
    }
  },

  methods: {
    takeCredit({ duration }) {
      this.$openModal("Game/TakeCredits", {
        duration
      }).catch(() => {});
    }
  }
};
</script>
