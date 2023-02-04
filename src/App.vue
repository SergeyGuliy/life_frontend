<template>
  <v-app>
    <component :is="layout">
      <router-view />
    </component>
      <modalWrapper />
      <notifications group="foo" />
  </v-app>
</template>

<script>
import mainLayout from "./layouts/mainLayout.vue";
import authLayout from "./layouts/authLayout.vue";
import modalWrapper from "./components/layouts/modalWrapper.vue";



// import {
//   socketSetup_callUserIdToServer,
//   socketSetup_forceDisconnect,
//   socketSetup_giveUserIdToServer
// } from "@constants/ws/socketSetup.js";


export default {
  name: "App",

  components: {
    mainLayout,
    authLayout,
    modalWrapper
  },
  computed: {
    layout() {
      return this.$route?.meta?.layout;
    },
  },

  // $initSocketListener() {
  //   this.$socketInit({
  //     [socketSetup_callUserIdToServer]: this.callUserIdToServer,
  //
  //     [socketSetup_forceDisconnect]: this.forceDisconnect
  //   });
  // },

  methods: {
    callUserIdToServer(clientId) {
      if (this.$user?.userId) {
        // this.$socket.client.emit(socketSetup_giveUserIdToServer, {
        //   userId: this.$user.userId,
        //   clientId
        // });
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
      this.$bus.emit("clickOutside");
    },
    // eslint-disable-next-line no-unused-vars
    clickOutsideContext(e) {
      // TODO add prevent default on prod
      // e.preventDefault();
      this.$bus.emit("clickOutside");
    },
  },
};
</script>

<style lang="scss">
@import "assets/styles/main";
.my-wrapper {
  height: 100%;
}
</style>
