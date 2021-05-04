import Vue from "vue";

import router from "../router";
import store from "../store";
import vuetify from "./modules/vuetify";
import { i18n } from "./modules/i18n";

import "./modules/bus";
import "./modules/mask";
import "./modules/long-click";
import "./modules/dialog";
import "./modules/debounce";
import "./modules/socket";
import "./modules/moment";
import "./modules/globalMixin";

Vue.config.productionTip = false;

export { router, store, vuetify, i18n };
