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
        <v-list-item
          link
          v-for="(item, index) in LOCALES_WITH_KEYS"
          :key="index"
          @click="changeLocale(item.key)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn icon @click="changeTheme">
      <v-icon>mdi-invert-colors</v-icon>
    </v-btn>
    <v-btn icon @click="logOutMiddleware">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { LOCALES_WITH_KEYS } from "@enums";
import { $currentUserActions } from "../../composable/$currentUserActions";

export default {
  name: "NavBar",
  setup() {
    return $currentUserActions();
  },
  data() {
    return {
      LOCALES_WITH_KEYS,
      items: [
        { title: "English", key: "en" },
        { title: "Russian", key: "ru" }
      ]
    };
  },
  props: {
    value: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style lang="scss">
.NavBar {
  .lang-selector {
  }
}
</style>
