<template>
  <v-app>
    <component :is="layout">
      <router-view />
    </component>
    <component v-if="getComponent" :is="getComponent"></component>
  </v-app>
</template>

<script>
// import Vue from "vue";
// import store from "./store";
import { mapState } from "vuex";
export default {
  name: "App",

  components: {
    mainLayout: () => import("./layouts/mainLayout"),
    authLayout: () => import("./layouts/authLayout")
  },
  computed: {
    ...mapState("modals", ["component"]),
    layout() {
      return this.$route.meta.layout;
    },
    getComponent() {
      if (this.component) {
        return require(`./components/modals/${this.component}`).default;
      }
      return null;
    }
  },
  async created() {}
};
</script>

<style lang="scss">
@import "assets/scc/main";
.my-wrapper {
  height: 100%;
}
</style>
