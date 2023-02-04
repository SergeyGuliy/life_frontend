import { pinia } from "../store";
import { vuetify } from "./modules/vuetify";
import { i18n } from "./modules/i18n";
import {router} from "../router";

import {installGlobalComponents} from "./modules/globalComponents";

// import "./modules/globalFilters/index";
// import "./modules/vuePropotype/index";
// import "./modules/bus";
// import "./modules/mask";
// import "./modules/notify";
// import "./modules/longClick";
// import "./modules/vueWorker";
// import "./modules/debounce";
// import "./modules/socket";
// import "./modules/moment";
// import "./modules/globalMixin/index";
// import "./modules/vuelidate";
// import "./modules/apexCharts";

function installGlobalUse(vue) {
  const plugins = [
    pinia,
    vuetify,
    i18n,
    router
  ]

  plugins.forEach(plugin => {
    vue.use(plugin)
  })
}

export function installPlugins(vue) {
  installGlobalUse(vue)
  installGlobalComponents(vue)


  vue.mount("#app")
}
