import { installGlobalComponents } from "./modules/globalComponents";
import { installGlobalContext } from "./modules/globalContext";
import { installGlobalFilters } from "./modules/globalFilters";
// import "./modules/globalFilters/index";
// import "./modules/vuePropotype/index";
// import "./modules/bus";
// import "./modules/mask";
// import "./modules/longClick";
// import "./modules/vueWorker";
// import "./modules/debounce";
// import "./modules/socket";
// import "./modules/moment";
// import "./modules/globalMixin/index";
// import "./modules/vuelidate";
// import "./modules/apexCharts";

export function installPlugins(vue) {
  installGlobalContext(vue);
  installGlobalComponents(vue);
  installGlobalFilters(vue);
}
