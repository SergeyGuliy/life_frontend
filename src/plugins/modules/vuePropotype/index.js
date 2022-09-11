import Vue from "vue";

import { $dictionares } from "./modules/$dictionares";
import {
  $v_setup,
  $v_validate,
  $v_getErrorMessage
} from "./modules/$vuelidate";

Vue.prototype.$dictionares = $dictionares;
Vue.prototype.$v_setup = $v_setup;
Vue.prototype.$v_validate = $v_validate;
Vue.prototype.$v_getErrorMessage = $v_getErrorMessage;

Vue.prototype.$filters = Vue.options.filters;
