<template>
  <v-app>
    <component :is="layout">
      <router-view />
    </component>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {
    mainLayout: () => import("./layouts/mainLayout"),
    authLayout: () => import("./layouts/authLayout")
  },
  computed: {
    layout() {
      return this.$route.meta.layout;
    }
  },
  data: () => ({
    //
  })
};
</script>

<style lang="scss">
.my-wrapper {
  height: 100%;
}
</style>
