import { installPinia } from "./pinia";
import { installVuetify } from "./vuetify";
import { installI18n } from "./i18n";
import { installRouter } from "./router";

import { installGlobalComponents } from "./globalComponents";
import { installGlobalDirectives } from "./globalDirectives";

import { installNotify } from "./notify";
import { installMask } from "./mask";
// import { installApexCharts } from "./modules/apexCharts";

export function installPlugins(vue) {
  installPinia(vue);
  installRouter(vue);
  installVuetify(vue);
  installI18n(vue);

  installGlobalComponents(vue);
  installGlobalDirectives(vue);

  installNotify(vue);
  installMask(vue);
  // installApexCharts(vue);
}

export { vuetify } from "./vuetify";
export { i18n } from "./i18n";
export { router } from "./router";
