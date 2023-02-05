<template>
  <!--  <apexchart :options="options" :series="series" :height="200" />-->
</template>

<script>
import { options } from "./graphOptions";

import { useSocket } from "@composable/useSocket";
const { onSocketInit } = useSocket();

export default {
  name: "GameCryptoGraph",

  data() {
    return {
      options,

      data: [],

      loading: true,
    };
  },

  // components: {
  //   apexchart: defineAsyncComponent(() => import("vue-apexcharts.vue")),
  // },

  props: {
    crypto: {},
  },

  computed: {
    series() {
      return [{ data: this.data }];
    },
  },

  created() {
    this.$gameAction("gamesCryptos", "getCryptoHistory", {
      name: this.crypto.name,
      gameId: this.$gameId,
    }).then((cryptoHistory) => {
      cryptoHistory
        .filter(({ date }) => date.monthCode && date.year)
        .forEach(this.addHistory);
      this.loading = false;

      onSocketInit({ games_tick: this.tickGameData });
    });
  },
  methods: {
    addHistory(crypto) {
      this.data.push({
        x: crypto.date.date,
        y: [
          crypto.previousPrice,
          crypto.previousPrice,
          crypto.currentPrice,
          crypto.currentPrice,
        ],
      });
    },

    tickGameData({ cryptos, date }) {
      let crypto = cryptos.find((crypto) => crypto.name === this.crypto.name);

      this.addHistory({
        ...crypto,
        date,
      });
    },
  },
};
</script>
