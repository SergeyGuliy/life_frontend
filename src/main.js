import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./plugins/mask";
import "./plugins/dialog";

import { i18n } from "./plugins/i18n";

Vue.config.productionTip = false;

export const myVue = new Vue({
  i18n,
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
