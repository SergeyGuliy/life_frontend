import Vue from "vue";
import vueDebounce, { debounce } from "vue-debounce";

Vue.use(vueDebounce);
Vue.prototype.$debounce = debounce;
