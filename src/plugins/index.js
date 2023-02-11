import { installGlobalComponents } from "./modules/globalComponents";
import { installGlobalContext } from "./modules/globalContext";
import { installGlobalFilters } from "./modules/globalFilters";
import { installGlobalDirectives } from "./modules/globalDirectives";

import { installMask } from "./modules/mask";
import { installApexCharts } from "./modules/apexCharts";

export function installPlugins(vue) {
  installGlobalContext(vue);
  installGlobalComponents(vue);
  installGlobalFilters(vue);
  installGlobalDirectives(vue);

  installMask(vue);
  // installApexCharts(vue);
}
