import { installGlobalComponents } from "./modules/globalComponents";
import { installGlobalContext } from "./modules/globalContext";
import { installGlobalDirectives } from "./modules/globalDirectives";

import { installMask } from "./modules/mask";
// import { installApexCharts } from "./modules/apexCharts";

import { i18n } from "./modules/globalContext/modules/i18n";
import { router } from "./modules/globalContext/modules/router";

export function installPlugins(vue) {
  installGlobalContext(vue);
  installGlobalComponents(vue);
  installGlobalDirectives(vue);

  installMask(vue);
  // installApexCharts(vue);
}

export { i18n, router };
