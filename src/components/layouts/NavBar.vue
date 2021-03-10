<template>
  <v-app-bar app>
    <v-btn icon @click="$emit('updateDrawer', !value)">
      <v-icon>
        mdi-menu
      </v-icon>
    </v-btn>
    <v-spacer />
    <v-btn icon @click="changeTheme">
      <v-icon>mdi-invert-colors</v-icon>
    </v-btn>
    <v-btn icon @click="logout">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    async changeTheme() {
      try {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      } catch (e) {
        console.log(`Error while trying to change theme: ${e}`);
      }
    },
    async logout() {
      try {
        await this.$store.dispatch("auth/logOut");
        this.$vuetify.theme.dark = false;
      } catch (e) {
        this.$emit("onError", e);
      }
    }
  }
};
</script>

<style lang="scss">
.NavBar {
}
</style>
