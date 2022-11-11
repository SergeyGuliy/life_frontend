<template>
  <div>
    <v-card-title class="py-0">
      Current work:
      <v-spacer></v-spacer>
      {{ getWorkName }}
    </v-card-title>

    <v-simple-table v-if="isWorkExist">
      <template v-slot:default>
        <thead>
          <tr>
            <th>Sector of work</th>
            <th>Salary</th>
            <th>Taxes</th>
            <th class="text-right">Salary including taxes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ $gameUserWork.economicSectors }}</td>
            <td>{{ $gameUserWork.salary }}</td>
            <td>''</td>
            <td class="text-right">''</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-card-actions>
      <v-btn v-if="isWorkExist" @click="quitYourJob" block>
        Quit your job
      </v-btn>
      <v-btn v-else @click="findJob" block>
        Find job
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  name: "GameUserWork",

  computed: {
    isWorkExist() {
      return !!this.$gameUserWork;
    },
    getWorkName() {
      return this.isWorkExist ? this.$gameUserWork.name : "Unemployed";
    }
  },

  methods: {
    quitYourJob() {
      if (!this.$gameUserWork) return;

      this.$openModal("Promt", {
        title: `You want to leave your work?`,
        submit: "Leave",
        cancel: this.$t("buttons.cancel")
      })
        .then(() => this.$gameAction("gamesWork", "leaveWork"))
        .then(newUserData => {
          this.$gameUserData = newUserData;
        });
    },
    async findJob() {
      await this.$openModal("Game/WorkList").catch(() => {});
    }
  }
};
</script>
