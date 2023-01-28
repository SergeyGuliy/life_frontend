import App from "./App.vue";
import { createApp } from "vue";
import router from "./router";

import { store, vuetify, i18n } from "./plugins";

createApp(App).use(vuetify).use(router).mount("#app");
