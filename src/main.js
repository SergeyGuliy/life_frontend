import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./plugins/mask";

Vue.config.productionTip = false;
store.dispatch("auth/refreshToken").then(() => {
  new Vue({
    beforeCreate: async function() {
      Vue.prototype.$vuetify = this.$vuetify;
    },
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount("#app");
  if (store.getters["auth/isLoggedIn"]) {
    Vue.prototype.$vuetify.theme.dark = store.state.auth.user.isDarkTheme;
  }
});
