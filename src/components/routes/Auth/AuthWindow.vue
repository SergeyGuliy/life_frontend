<template>
  <v-card max-width="450" class="auth align-self-center">
    <v-snackbar
      top
      right
      color="error"
      v-model="snackbar.isOpened"
      :timeout="snackbar.timeout"
    >
      {{ snackbar.text }}

      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="snackbar.isOpened = false">
          <v-icon> mdi-close </v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-tabs
      v-model="tab"
      background-color="deep-purple accent-4"
      centered
      dark
      icons-and-text
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#tab-login">
        Login
        <v-icon>mdi-login</v-icon>
      </v-tab>

      <v-tab href="#tab-registration">
        Registration
        <v-icon>mdi-login</v-icon>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <TabLogin @onError="onError" />
      <TabRegister @onError="onError" />
    </v-tabs-items>
  </v-card>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "AuthWindow",
  components: {
    TabLogin: defineAsyncComponent(() => import("./TabLogin.vue")),
    TabRegister: defineAsyncComponent(() => import("./TabRegister.vue")),
  },
  data() {
    return {
      tab: "tab-login",
      snackbar: {
        isOpened: false,
        timeout: 2000,
        text: "",
      },
    };
  },
  methods: {
    onError(text) {
      this.snackbar.text = text;
      this.snackbar.isOpened = true;
    },
  },
};
</script>

<style lang="scss">
.auth {
}
</style>
