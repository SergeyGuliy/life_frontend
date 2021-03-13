<template>
  <v-app>
    <component :is="layout">
      <router-view />
    </component>
  </v-app>
</template>

<script>
// import Vue from "vue";
// import store from "./store";

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
  async created() {}
};
</script>

<style lang="scss">
.my-wrapper {
  height: 100%;
}
</style>
