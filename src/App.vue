<template>
  <v-app>
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
  async mounted() {
    this.intiComponent();
    this.$watch("$socket.connected", this.intiComponent);
    this.$watch("$socket.connected", val => {
      if (!val) {
        this.$socket.client.off("callUserIdToServer", this.callUserIdToServer);
        this.$socket.client.off("forceDisconnect", this.forceDisconnect);
      }
    });
  },
  methods: {
    async intiComponent() {
      if (!this.$socket.connected) return;

      this.$socket.client.on("callUserIdToServer", this.callUserIdToServer);
      this.$socket.client.on("forceDisconnect", this.forceDisconnect);
    },

    callUserIdToServer(clientId) {
      if (this.$user?.userId) {
        this.$socket.client.emit("giveUserIdToServer", {
          userId: this.$user.userId,
          clientId
        });
      }
    },
    async forceDisconnect() {
      if (this.$route.meta.layout === "mainLayout") {
        await this.$store.dispatch("auth/logOut");
        await this.$router.push({ name: "Closer" });
      }
    },

    initClickObservers() {
      const body = document.querySelector("body");
      body.addEventListener("click", this.clickOutside);
      body.addEventListener("contextmenu", this.clickOutsideContext);
    },
    clickOutside() {
      this.$bus.emit("click-outside");
    },
    // eslint-disable-next-line no-unused-vars
    clickOutsideContext(e) {
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
