import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./plugins/mask";
import "./plugins/dialog";

Vue.config.productionTip = false;

export const myVue = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
