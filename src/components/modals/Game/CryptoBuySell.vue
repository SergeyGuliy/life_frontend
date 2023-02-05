<template>
  <v-dialog persistent class="p-2" :model-value="!!component" width="500">
    <v-card class="CreateRoom">
      <v-form ref="buySell" v-model="valid">
        <v-card-title class="pb-0">
          {{ data.name }} {{ cryptoData.currentPrice }} $
          <v-spacer />
          <v-chip :color="cryptoData.grow_loss > 0 ? 'green' : 'red'" label>
            {{ cryptoData.grow_loss }} %
          </v-chip>
        </v-card-title>

        <v-tabs v-model="tabIndex" fixed-tabs>
          <v-tab v-for="tabName in tabs" :key="tabName">
            {{ $t(`buttons.${tabName}`) }}
          </v-tab>
        </v-tabs>

        <v-card-subtitle class="pb-0 d-flex">
          <div class="mr-5" style="width: 150px">
            <div class="mb-2">Operation type: {{ operationType }}</div>
            <div class="mb-2">Cash: {{ $gameUserCash }} $</div>
            <div class="mb-4">
              Balance: {{ userCrypto.count }} {{ data.name }}
            </div>
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
            v-model.number="operationPrice"
            :label="$t('forms.labels.enterOldPassword')"
            :rules="[...rules.number]"
            :disabled="changePriceDisabled"
            outlined
            dense
            type="number"
          />
          <v-text-field
            v-model.number="operationCount"
            :rules="[...rules.number, ...rules.operationCount]"
            :label="$t('forms.labels.enterOldPassword')"
            outlined
            dense
            type="number"
          />
          <v-text-field
            :value="operationTotal"
            disabled
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
            :disabled="!valid"
          >
            {{ buttonOptions.text }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { $mChain } from "@utils/mathjs";
import { useModal } from "../../../composable/useModal";

export default {
  name: "CryptoBuySell",

  setup() {
    const { data, component, closeModal } = useModal();
    return { data, component, closeModal };
  },
  created() {
    this.activeTab = this.data.type;
    this.updateOperationPriceIfTaker();
  },

  mounted() {
    this.$refs?.buySell?.validate();
  },

  computed: {
    userCrypto() {
      let userCrypto = this.$gameUserData.cryptos.find(
        ({ name }) => name === this.data.name
      );
      let defaultCrypto = {
        count: 0,
        name: this.data.name,
      };

      return userCrypto || defaultCrypto;
    },

    activeTab: {
      get() {
        return this.tabs[this.tabIndex];
      },
      set(val) {
        this.tabIndex = this.tabs.findIndex((item) => item === val);
      },
    },
    cryptoData() {
      return this.$gameCryptos.find((crypto) => crypto.name === this.data.name);
    },
    operationType() {
      return this.operationPrice === this.cryptoData.currentPrice
        ? "TAKER"
        : "MAKER";
    },

    operationTotal() {
      return $mChain(this.operationPrice)
        .multiply(this.operationCount)
        .round(2)
        .done();
    },

    buttonOptions() {
      let options = {};

      options.color = this.activeTab === "BUY" ? "green" : "red";

      if (this.operationType === "TAKER") {
        options.text =
          this.activeTab === "BUY"
            ? this.$t("buttons.buy")
            : this.$t("buttons.sell");
      } else {
        options.text =
          this.activeTab === "BUY"
            ? this.$t("buttons.long")
            : this.$t("buttons.short");
      }

      return options;
    },
  },

  watch: {
    cryptoData() {
      this.updateOperationPriceIfTaker();
    },
    changePriceDisabled() {
      this.updateOperationPriceIfTaker();
    },
    activeTab() {
      this.$refs?.buySell?.validate();
    },
  },

  data() {
    return {
      rules: {
        number: [
          (v) => !!v || "Can't be empty",
          (v) => typeof v === "number" || "Must be number",
          (v) => v > 0 || "Must be positive value",
        ],
        operationCount: [
          (v) => {
            if (this.activeTab === "SELL") {
              return v <= this.userCrypto.count || "Not enough crypto";
            }
            return (
              this.$gameUserCash >= this.operationTotal || "Not enough cash"
            );
          },
        ],
      },

      valid: false,

      tabs: ["BUY", "SELL"],
      tabIndex: 0,

      loading: false,
      changePriceDisabled: true,

      operationPrice: 0,
      operationCount: 1,
    };
  },
  methods: {
    updateOperationPriceIfTaker() {
      if (this.changePriceDisabled) {
        this.operationPrice = this.cryptoData.currentPrice;
      }
    },

    makeAction() {
      if (!this.$refs.buySell.validate()) return;

      let data = {
        name: this.data.name,
        buySell: this.activeTab,
        operationType: this.operationType,
        operationPrice: this.operationPrice,
        operationCount: this.operationCount,
        operationTotal: this.operationTotal,
      };

      this.loading = true;
      this.$gameAction("gamesCryptos", "buySell", data)
        .then((res) => {
          this.$gameUserData = res;
        })
        .finally(() => {
          this.loading = false;
          this.closeModal();
        });
    },
  },
};
</script>
