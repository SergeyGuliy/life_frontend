import Vue from "vue";
import App from "./App.vue";

import { router, store, vuetify, i18n } from "./plugins";

export const myVue = new Vue({
  store,
  vuetify,
  i18n,
  router,
  render: h => h(App)
}).$mount("#app");
