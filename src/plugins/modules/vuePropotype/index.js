import Vue from "vue";

import { $dictionares } from "./modules/$dictionares";
import { $vuelidate } from "./modules/$vuelidate";

Vue.prototype.$dictionares = $dictionares;
Vue.prototype.$vuelidate = $vuelidate;

Vue.prototype.$filters = Vue.options.filters;
