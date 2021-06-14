<template>
  <div class="Closer d-flex align-center justify-center flex-column">
    <h1>You can't use multiple windows</h1>
    <v-btn text @click="goForward">Go back</v-btn>
  </div>
</template>

<script>
export default {
  name: "Closer",
  components: {},
  async mounted() {
    this.$vuetify.theme.dark = false;
  },
  methods: {
    async goForward() {
      await this.$store.dispatch("auth/refreshToken");
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss">
.Closer {
}
</style>
