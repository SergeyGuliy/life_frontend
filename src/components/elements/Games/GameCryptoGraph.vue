<template>
  <apexchart :options="options" :series="series" :height="200" />
</template>

<script>
import { api } from "@/utils/api";
import VueApexCharts from "vue-apexcharts";
import moment from "moment";
import { createNumber } from "@/utils/createNumber";

let options = {
  chart: {
    type: "candlestick"
  },
  title: {
    text: "CandleStick Chart",
    align: "left"
  },
  tooltip: {
    custom: ({ seriesIndex, dataPointIndex, w }) => {
      let { y, x } = w.globals.initialSeries[seriesIndex].data[dataPointIndex];

      let date = moment(x).format("YYYY MMM");
      let prev = y[0];
      let cur = y[3];

      let dif = createNumber(cur / prev)
        .changePrise()
        .round();

      const color = dif.number > 0 ? "green" : "red";

      return `
      <table style="background-color: #555555; padding: 3px">
        <tr>
          <td>Date:</td>
          <td>${date}</td>
        </tr>
        <tr>
          <td>Open:</td>
          <td>${createNumber(prev)
            .round()
            .getPrice()}</td>
        </tr>
        <tr>
          <td>Close:</td>
          <td>${createNumber(cur)
            .round()
            .getPrice()}</td>
        </tr>
        <tr>
          <td style="padding-right: 5px">Grow/Loss:</td>
          <td align="center" style="background-color: ${color}">${dif.getPercent()}</td>
        </tr>
      </table>
      `;
    }
  },
  xaxis: {
    type: "datetime"
  },
  yaxis: {
    labels: {
      formatter: function(val) {
        return createNumber(val)
          .round(0)
          .getPrice();
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
