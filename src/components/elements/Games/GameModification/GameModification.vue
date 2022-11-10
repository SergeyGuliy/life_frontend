<template>
  <div>
    <!--    <pre>{{ inflation }}</pre>-->
    <!--    <pre>{{ keyRate }}</pre>-->
    <GameModificationGraph :inflation="inflation" :keyRate="keyRate" />
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
      return this.$gameModifiers?.inflation?.history || [];
    },
    keyRate() {
      return this.$gameModifiers?.keyRate?.history || [];
    }
  }
};
</script>

<style scoped></style>
