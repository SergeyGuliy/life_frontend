import { installPinia } from "./modules/pinia";
import { installVuetify, vuetify } from "./modules/vuetify";
import { installI18n, i18n } from "./modules/i18n";
import { installRouter, router } from "./modules/router";

import { installGlobalComponents } from "./modules/globalComponents";
import { installGlobalDirectives } from "./modules/globalDirectives";

import { installNotify } from "./modules/notify";
import { installMask } from "./modules/mask";
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
