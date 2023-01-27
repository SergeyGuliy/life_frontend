import Vue from "vue";
import App from "./App.vue";
import router from "./router";

// import { store, vuetify, i18n } from "./plugins";

export const myVue = new Vue({
  // store,
  // vuetify,
  // i18n,
  render: (h) => h(App),
}).$mount("#app");

myVue.use(router);
