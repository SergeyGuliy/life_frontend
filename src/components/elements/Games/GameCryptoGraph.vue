<template>
  <apexchart :options="options" :series="series" :height="150" />
</template>

<script>
import { api } from "@/utils/api";
import VueApexCharts from "vue-apexcharts";
import moment from "moment";

let options = {
  chart: {
    type: "candlestick"
  },
  title: {
    text: "CandleStick Chart",
    align: "left"
  },
  tooltip: {
    custom: function({ seriesIndex, dataPointIndex, w }) {
      let { y, x } = w.globals.initialSeries[seriesIndex].data[dataPointIndex];

      let date = moment(x).format("YYYY MMM");

      return `
      <div class="tooltip" style="background-color: #555555">
        <div>Date: ${date}</div>
        <div>Open: ${y[0]}</div>
        <div>Close: ${y[3]}</div>
        <div>Grow/Loss: ${y[3]}</div>
      </div>
      `;
    }
  },
  xaxis: {
    type: "datetime"
  },
  yaxis: {
    labels: {
      formatter: function(val) {
        return val.toFixed(0);
      }
    },
    tooltip: {
      enabled: true
    }
  }
};
export default {
  name: "GameCryptoGraph",

  data() {
    return {
      options,

      data: [],

      loading: true
    };
  },

  components: { apexchart: VueApexCharts },

  props: {
    crypto: {}
  },

  computed: {
    series() {
      return [{ data: this.data }];
    }
  },

  $initSocketListener() {
    api.games.crypto
      .getCrypto({
        name: this.crypto.name,
        gameId: this.$gameId
      })
      .then(cryptoHistory => {
        cryptoHistory
          .filter(({ date }) => date.monthCode && date.year)
          .forEach(this.addHistory);
        this.loading = false;

        this.$socketInit({
          games_tick: this.tickGameData
        });
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
          crypto.currentPrice
        ]
      });
    },

    tickGameData({ cryptos, date }) {
      let crypto = cryptos.find(crypto => crypto.name === this.crypto.name);

      this.addHistory({
        ...crypto,
        date
      });
    }
  }
};
</script>
