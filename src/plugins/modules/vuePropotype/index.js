import Vue from "vue";

import { $dictionares } from "./modules/$dictionares";

Vue.prototype.$dictionares = $dictionares;

Vue.prototype.$filters = Vue.options.filters;
