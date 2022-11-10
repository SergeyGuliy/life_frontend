<template>
  <apexchart :options="options" :series="series" :height="200" />
</template>

<script>
import { $mGenerateLine } from "@/utils/mathjs";

export default {
  name: "GameModificationGraph",

  components: {
    apexchart: () => import("vue-apexcharts")
  },

  data() {
    return {
      series: [
        {
          name: "Inflation",
          data: [
            ...$mGenerateLine(30, 0, 3)
            // ...$mGenerateLine(5, 3, 1),
            // ...$mGenerateLine(8, 1, 10),
            // ...$mGenerateLine(15, 10, 50),
            // ...$mGenerateLine(10, 50, 5),
            // ...$mGenerateLine(5, 5, 50),
          ]
        }
        // {
        //   name: "Key rate",
        //   data: $mGenerateLine(30, 4)
        // },
        // {
        //   name: "GDP",
        //   data: $mGenerateLine(30, 1)
        // }
      ],
      options: {
        chart: {
          height: 350,
          type: "line",
          stacked: false
        }
      }
    };
  }
};
</script>

<style>
.apexcharts-tooltip,
.apexcharts-tooltip-title {
  background-color: #555555 !important;
}
.apexcharts-legend-text {
  color: white !important;
  font-size: 16px !important;
}
</style>
