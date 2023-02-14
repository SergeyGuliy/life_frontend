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

      <template v-slot:actions="{ attrs }">
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
      <v-tab value="tab-login">
        Login
        <v-icon>mdi-login</v-icon>
      </v-tab>

      <v-tab value="tab-registration">
        Registration
        <v-icon>mdi-login</v-icon>
      </v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <TabLogin @onError="onError" />
      <TabRegister @onError="onError" />
    </v-window>
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
