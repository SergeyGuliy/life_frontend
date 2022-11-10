<template>
  <apexchart :options="options" :series="series" :height="200" />
</template>

<script>
export default {
  name: "GameModificationGraph",

  components: {
    apexchart: () => import("vue-apexcharts")
  },

  props: {
    inflation: {
      type: Array,
      required: true
    },
    keyRate: {
      type: Array,
      required: true
    }
  },

  computed: {
    series() {
      return [
        {
          name: "Inflation",
          data: this.inflation
        },
        {
          name: "Key rate",
          data: this.keyRate
        }
      ];
    }
  },

  data() {
    return {
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
