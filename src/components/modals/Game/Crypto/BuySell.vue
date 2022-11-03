<template>
  <v-dialog
    persistent
    class="p-2"
    :value="!!component"
    width="500"
    @click:outside.prevent.stop="close()"
  >
    <v-card class="CreateRoom">
      <v-form ref="changePassword">
        <v-card-title class="pb-0">
          {{ data.name }} {{ cryptoData.currentPrice }} $
        </v-card-title>

        <v-tabs v-model="tabIndex" fixed-tabs>
          <v-tab v-for="tabName in tabs" :key="tabName">
            {{ $t(`buttons.${tabName}`) }}
          </v-tab>
        </v-tabs>

        <v-card-subtitle class="pb-0 d-flex">
          <div class="mr-5" style="width: 150px">
            <div class="mb-2">Operation type: {{ operationType }}</div>
            <div>Cash: {{ $gameUserData.cash }} $</div>
          </div>
          <FSwitch
            style="width: 150px"
            label="Change price:"
            v-model="changePriceDisabled"
            :valueText="changePriceDisabled ? 'disabled' : 'enabled'"
          />
        </v-card-subtitle>

        <v-card-text>
          <v-text-field
            v-model="operationPrice"
            :label="$t('forms.labels.enterOldPassword')"
            :disabled="changePriceDisabled"
            outlined
            dense
            type="number"
          />
          <v-text-field
            v-model="operationCount"
            :label="$t('forms.labels.enterOldPassword')"
            outlined
            dense
            type="number"
          />
          <v-text-field
            :value="operationTotal"
            readonly
            :label="$t('forms.labels.enterOldPassword')"
            outlined
            dense
            type="number"
          />
        </v-card-text>

        <v-card-actions class="px-5 pt-0 pb-5">
          <v-btn
            :color="buttonOptions.color"
            @click="makeAction"
            block
            :loading="loading"
          >
            {{ buttonOptions.text }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import modal from "@mixins/modal";

export default {
  name: "BuySell",
  mixins: [modal],

  created() {
    this.activeTab = this.data.type;
    this.updateOperationPriceIfTaker();
  },

  computed: {
    activeTab: {
      get() {
        return this.tabs[this.tabIndex];
      },
      set(val) {
        let index = this.tabs.findIndex(item => item === val);
        this.tabIndex = index;
      }
    },
    cryptoData() {
      return this.$gameCryptos.find(crypto => crypto.name === this.data.name);
    },
    operationType() {
      return this.operationPrice === this.cryptoData.currentPrice
        ? "TAKER"
        : "MAKER";
    },

    operationTotal() {
      return this.operationPrice * this.operationCount;
    },

    buttonOptions() {
      let options = {};

      options.color = this.activeTab === "buy" ? "green" : "red";

      if (this.operationType === "TAKER") {
        options.text =
          this.activeTab === "buy"
            ? this.$t("buttons.buy")
            : this.$t("buttons.sell");
      } else {
        options.text =
          this.activeTab === "buy"
            ? this.$t("buttons.long")
            : this.$t("buttons.short");
      }

      return options;
    }
  },

  watch: {
    cryptoData() {
      this.updateOperationPriceIfTaker();
    },
    changePriceDisabled() {
      this.updateOperationPriceIfTaker();
    }
  },

  data() {
    return {
      tabs: ["buy", "sell"],
      tabIndex: 0,

      loading: false,
      changePriceDisabled: true,

      operationPrice: 0,
      operationCount: 1
    };
  },
  methods: {
    updateOperationPriceIfTaker() {
      if (this.changePriceDisabled) {
        this.operationPrice = this.cryptoData.currentPrice;
      }
    },

    makeAction() {
      let data = {
        buySell: this.activeTab,
        operationType: this.operationType,
        operationPrice: this.operationPrice,
        operationCount: this.operationCount,
        operationTotal: this.operationTotal
      };

      this.loading = true;
      this.$gameAction("gamesCryptos", "buySell", data)
        .then(res => {
          console.log(res);
        })
        .finally(() => {
          this.loading = false;
        });

      // this.close()
    }
  }
};
</script>

<style lang="scss"></style>
