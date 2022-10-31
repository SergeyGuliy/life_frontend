<template>
  <line-chart
    :chart-options="chartOptions"
    :chart-data="chartData"
    :dataset-id-key="datasetIdKey"
    :width="width"
    :height="height"
  />
</template>

<script>
// import {api} from "@/utils/api";

import { api } from "@/utils/api";

import { Line } from "vue-chartjs/legacy";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
);
export default {
  name: "GameCryptoGraph",

  data() {
    return {
      datasetIdKey: "label",
      width: 400,
      height: 400,

      chartData: {
        labels: [],
        datasets: [
          {
            label: this.crypto.name,
            backgroundColor: "#f87979",
            data: []
          }
        ]
      },
      chartOptions: {
        responsive: true
      },

      loading: true,

      cryptoHistory: null
    };
  },

  components: { "line-chart": Line },

  props: {
    crypto: {}
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
          .forEach(({ date, currentPrice }) => {
            this.chartData.datasets[0].data.push(currentPrice);
            this.chartData.labels.push(`${date.monthCode} ${date.year}`);
          });
        this.loading = false;

        this.$socketInit({
          games_tick: this.tickGameData
        });
      });
  },
  methods: {
    tickGameData({ cryptos, date }) {
      let { currentPrice } = cryptos.find(
        crypto => crypto.name === this.crypto.name
      );
      this.chartData.datasets[0].data.push(currentPrice);
      this.chartData.labels.push(`${date.monthCode} ${date.year}`);
    }
  }
};
</script>
