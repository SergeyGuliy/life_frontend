<template>
  <v-app-bar app class="NavBar">
    <v-btn icon @click="$emit('updateDrawer', !value)">
      <v-icon>
        mdi-menu
      </v-icon>
    </v-btn>
    <v-spacer />
    <v-menu offset-y class="lang-selector" auto>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-translate</v-icon>
        </v-btn>
      </template>
      <v-list class="lang-selector__list">
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
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
  data() {
    return {
      items: [
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me 2" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me 2" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me 2" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me 2" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me 2" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me 2" }
      ]
    };
  },
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
/*.lang-selector__list {*/
/*  max-height: 500px;*/
/*  overflow: auto;*/
/*}*/
.NavBar {
  .lang-selector {
  }
}
</style>
