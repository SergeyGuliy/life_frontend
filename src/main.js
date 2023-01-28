// import Vue from "vue";
import App from "./App.vue";
import { createApp } from "@vue/compat";
import router from "./router";

// import { store, vuetify, i18n } from "./plugins";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

// export const myVue = new Vue({
//   // store,
//   vuetify,
//   // i18n,
//   router,
//   render: (h) => h(App),
// }).$mount("#app");

// myVue.use(router);

createApp(App).use(vuetify).use(router).mount("#app");
