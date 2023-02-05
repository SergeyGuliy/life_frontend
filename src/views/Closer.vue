<template>
  <div class="Closer d-flex align-center justify-center flex-column">
    <h1>You can't use multiple windows</h1>
    <v-btn text @click="goForward">Go back</v-btn>
  </div>
</template>

<script>
export default {
  name: "Closer",
  methods: {
    async goForward() {
      await this.$store.dispatch("auth/refreshToken");
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style lang="scss">
.Closer {
}
</style>
