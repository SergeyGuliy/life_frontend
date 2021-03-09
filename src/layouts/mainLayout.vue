<template>
  <v-app>
    <div class="my-wrapper">
      <v-app-bar app color="primary" dark>
        <div class="d-flex align-center">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
          />

          <v-img
            alt="Vuetify Name"
            class="shrink mt-1 hidden-sm-and-down"
            contain
            min-width="100"
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
            width="100"
          />
        </div>

        <v-spacer></v-spacer>

        <v-btn target="_blank" icon>
          <v-icon>mdi-open-in-new</v-icon>
        </v-btn>
      </v-app-bar>

      <v-main>
        <v-container>
          <slot />
        </v-container>
      </v-main>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "mainLayout",
  components: {},
  data() {
    return {
      items: [
        // { title: 'Главная', icon: 'mdi-view-dashboard', link: 'Main' },
        // { title: 'Комуналка', icon: 'mdi-briefcase-check', link: 'Comunalka' },
        // { title: 'Admin', icon: 'mdi-gavel' },
      ],
      drawer: false
    };
  },
  created() {
    console.log("created-layout");
  },
  mounted() {
    console.log("mounted-layout");
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
      } catch (e) {
        this.$emit("onError", e);
      }
    }
  }
};
</script>

<style lang="scss">
.main-layout {
}
</style>
