<template>
  <v-card class="GamesDeposits" v-if="$gameDeposits">
    <v-card-title class="py-0">
      Game deposits
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
          <tr v-for="(deposit, index) in $gameDeposits.deposits" :key="index">
            <td width="28%">{{ deposit.duration }} month</td>
            <td width="28%" class="text-center">{{ deposit.percent }} %</td>
            <td class="text-right">
              <v-btn
                depressed
                color="green"
                class="mr-1"
                x-small
                @click="takeDeposit(deposit)"
              >
                Take deposit
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
  name: "GamesDeposits",

  computed: {
    getDate() {
      const { monthCode, year } = this.$gameDeposits.lastRecalculation;
      return `${monthCode} ${year}`;
    }
  },

  methods: {
    takeDeposit({ duration }) {
      this.$openModal("Game/TakeDeposit", {
        duration
      }).catch(() => {});
    }
  }
};
</script>
