<template>
  <v-app @click="clickOutside">
    <component :is="layout">
      <router-view />
    </component>
    <component v-if="getComponent" :is="getComponent"></component>
    <notifications group="foo" />
  </v-app>
</template>

<script>
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
  sockets: {
    callUserIdToServer(clientId) {
      if (this.$user?.userId) {
        this.$socket.emit("giveUserIdToServer", {
          userId: this.$user.userId,
          clientId
        });
      }
    }
  },
  async mounted() {
    document.querySelector("body").addEventListener("click", this.clickOutside);
    document
      .querySelector("body")
      .addEventListener("contextmenu", this.clickOutsideContext);
  },
  methods: {
    clickOutside() {
      this.$bus.emit("click-outside");
    },
    clickOutsideContext() {
      // TODO add prevent default on prod
      // e.preventDefault();
      this.$bus.emit("click-outside");
    }
  }
};
</script>

<style lang="scss">
@import "assets/styles/main";
.my-wrapper {
  height: 100%;
}
</style>
