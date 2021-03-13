import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import webSocket from "./modules/web-socket";
import modals from "./modules/modals";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    auth,
    webSocket,
    modals
  }
});
