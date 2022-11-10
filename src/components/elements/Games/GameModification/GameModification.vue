<template>
  <div>
    <!--    <pre>{{ inflation }}</pre>-->
    <pre>{{ basic }}</pre>
    <pre>{{ tickModifiers }}</pre>
    <GameModificationGraph
      :inflation="inflation.history"
      :keyRate="keyRate.history"
      :unemployment="unemployment.history"
      :GDP="GDP.history"
    />
  </div>
</template>

<script>
export default {
  name: "GameModification",

  components: {
    GameModificationGraph: () => import("./GameModificationGraph")
  },

  computed: {
    inflation() {
      return this.$gameModifiers?.inflation;
    },
    keyRate() {
      return this.$gameModifiers?.keyRate;
    },
    unemployment() {
      return this.$gameModifiers?.unemployment;
    },
    GDP() {
      return this.$gameModifiers?.GDP;
    },
    basic() {
      return this.$gameModifiers?.basic;
    },
    tickModifiers() {
      console.log(this.$gameModifiers);
      return {
        inflation: this.$gameModifiers.inflation.month1,
        keyRate: this.$gameModifiers.keyRate.month1,
        unemployment: this.$gameModifiers.unemployment.month1,
        GDP: this.$gameModifiers.unemployment.month1
      };
    }
  }
};
</script>

<style scoped></style>
