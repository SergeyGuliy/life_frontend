<template>
  <v-dialog
    persistent
    class="p-2"
    :value="!!component"
    width="500"
    @click:outside.prevent.stop="close()"
  >
    <v-card class="TakeCredits">
      <v-form ref="takeDeposit" v-model="valid">
        <v-tabs v-model="tabIndex" center-active>
          <v-tab v-for="tabName in tabs" :key="tabName">
            {{ tabName }} month
          </v-tab>
        </v-tabs>

        <v-card-title class="pb-4 flex flex-column">
          <div class="text-body-1">Deposit rate:</div>
          <div>{{ selectedDeposit.percent }} % yearly</div>
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-model.number="cashCount"
            :label="$t('forms.labels.enterOldPassword')"
            :rules="rules.cashCount"
            outlined
            dense
            type="number"
          />
          <v-simple-table dense>
            <template v-slot:default>
              <thead></thead>
              <tbody>
                <tr>
                  <td>Duration</td>
                  <td>{{ selectedDeposit.duration }} month</td>
                </tr>
                <tr>
                  <td>Pay per month</td>
                  <td>{{ incomePerMonth }} $</td>
                </tr>
                <tr>
                  <td>Total pay</td>
                  <td>{{ incomeTotal }} $</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>

        <v-card-actions class="px-5 pt-0 pb-5">
          <v-btn
            color="green"
            @click="takeDeposit"
            block
            :loading="loading"
            :disabled="!valid || selectedDeposit.disabled"
          >
            Take deposit
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import modal from "@/mixins/modal";
import { $mChain } from "@/utils/mathjs";

export default {
  name: "TakeCredits",
  mixins: [modal],

  created() {
    let duration = this.data.duration;
    this.tabIndex = this.tabs.findIndex(i => i === duration);
  },

  computed: {
    tabs() {
      return this.$gameDeposits.deposits.map(i => i.duration);
    },
    selectedDeposit() {
      return this.$gameDeposits.deposits[this.tabIndex];
    },
    incomePerMonth() {
      let { percent } = this.selectedDeposit;
      let monthPercent = $mChain(percent)
        .divide(12)
        .done();
      return $mChain(this.cashCount)
        .percent(monthPercent)
        .subtract(this.cashCount)
        .round(2)
        .done();
    },
    incomeTotal() {
      let { duration } = this.selectedDeposit;
      return $mChain(this.incomePerMonth)
        .multiply(duration)
        .round(2)
        .done();
    }
  },

  data() {
    return {
      valid: false,

      tabIndex: 0,

      cashCount: 1000,
      rules: {
        cashCount: [
          v => !!v || "Can't be empty",
          v => typeof v === "number" || "Must be number",
          v => v > 0 || "Must be positive value",
          () => this.$gameUserCash >= this.cashCount || "Not enough cash"
        ]
      }
    };
  },

  methods: {
    takeDeposit() {
      if (!this.$refs.takeDeposit.validate()) return;
      this.loading = true;

      let data = {
        cashCount: this.cashCount,
        deposit: this.selectedDeposit
      };

      this.$gameAction("gamesDeposits", "take", data)
        .then(res => {
          this.$gameUserData = res;
        })
        .finally(() => {
          this.loading = false;
          // this.close();
        });
    }
  }
};
</script>
