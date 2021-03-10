<template>
  <div class="home"></div>
</template>

<script>
// import { api } from "../assets/helpers/api";

export default {
  name: "Home",
  async created() {
    await this.$store.dispatch("auth/refreshToken");
  }
};
</script>
