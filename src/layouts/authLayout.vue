<template>
  <v-app class="auth-layout">
    <slot />
  </v-app>
</template>

<script>
export default {
  name: "authLayout",
  mounted() {
    // this.$vuetify.theme.dark = false;
  },
};
</script>

<style lang="scss">
.auth-layout {
  min-height: 100%;
  .v-application--wrap {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
