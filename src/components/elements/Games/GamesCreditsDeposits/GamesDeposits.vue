<template>
  <div class="GamesDeposits" v-if="$gameDeposits">
    <v-card-subtitle class="py-0">
      Last updated: {{ getDate }}
    </v-card-subtitle>

    <v-simple-table dense fixed-header>
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
  </div>
</template>

<script>
import { useModal } from "@composable/useModal";
const { openModal } = useModal();

export default {
  name: "GamesDeposits",

  computed: {
    getDate() {
      const { monthCode, year } = this.$gameDeposits.date;
      return `${monthCode} ${year}`;
    },
  },

  methods: {
    takeDeposit({ duration }) {
      openModal("Game/TakeDeposit", {
        duration,
      }).catch(() => {});
    },
  },
};
</script>
