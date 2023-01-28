import Vue from "vue";

import { store } from "../store";
import vuetify from "./modules/vuetify";
import { i18n } from "./modules/i18n";

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
// import "./modules/globalComponents";
// import "./modules/vuelidate";
// import "./modules/apexCharts";

Vue.config.productionTip = false;

export { store, vuetify, i18n };
