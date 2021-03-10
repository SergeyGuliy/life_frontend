<template>
  <v-app>
    <component :is="layout">
      <router-view />
    </component>
  </v-app>
</template>

<script>
// import Vue from "vue";
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
  async created() {
    await this.$store.dispatch("auth/refreshToken");
    // const userId = localStorage.getItem("userId");
    // const refreshToken = localStorage.getItem("refreshToken");
    // const accessToken = localStorage.getItem("accessToken");
    // console.log(userId);
    // console.log(refreshToken);
    // console.log(accessToken);
    // console.log(this.$route.name)
    // if (this.$route.name === "Auth") {
    //   console.log("Auth");
    // }
  }
};
</script>

<style lang="scss">
.my-wrapper {
  height: 100%;
}
</style>
