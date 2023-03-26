import { installPinia } from "./pinia";
import { installVuetify, vuetify } from "./vuetify";
import { installI18n, i18n } from "./i18n";
import { installRouter, router } from "./router";

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

export { i18n, router, vuetify };
