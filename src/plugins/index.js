import { installGlobalComponents } from "./modules/globalComponents";
import { installGlobalContext } from "./modules/globalContext";
import { installGlobalDirectives } from "./modules/globalDirectives";

import { installMask } from "./modules/mask";
// import { installApexCharts } from "./modules/apexCharts";

export function installPlugins(vue) {
  installGlobalContext(vue);
  installGlobalComponents(vue);
  installGlobalDirectives(vue);

  installMask(vue);
  // installApexCharts(vue);
}
