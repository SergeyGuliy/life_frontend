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
          {{ data.name }}
        </v-card-title>

        <v-tabs v-model="tabIndex" fixed-tabs>
          <v-tab v-for="tabName in tabs" :key="tabName">
            {{ $t(`buttons.${tabName}`) }}
          </v-tab>
        </v-tabs>

        <v-card-subtitle class="pb-0">
          Operation type: {{ operationType }}
          <FSwitch
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
            color="green"
            @click="close()"
            block
            v-if="activeTab === 'buy'"
          >
            {{ $t("buttons.buy") }}
          </v-btn>
          <v-btn
            color="red"
            @click="changePassword"
            block
            v-if="activeTab === 'sell'"
          >
            {{ $t("buttons.sell") }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import modal from "@mixins/modal";
import { api } from "@api";

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
        ? "taker"
        : "maker";
    },

    operationTotal() {
      return this.operationPrice * this.operationCount;
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

      changePriceDisabled: true,

      operationPrice: 0,
      operationCount: 1
    };
  },
  methods: {
    updateOperationPriceIfTaker() {
      if (this.changePriceDisabled) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.operationPrice = this.cryptoData.currentPrice;
      }
    },

    async changePassword() {
      if (this.$refs.changePassword.validate()) {
        await api.userSettings
          .changePassword(this.formData)
          .then(() => {
            this.$noti().info("ffff");
            this.close(true);
          })
          .catch(() => {
            this.$noti().error("ffff");
          });
      }
    }
  }
};
</script>

<style lang="scss"></style>
