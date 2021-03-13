import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import webSocket from "./modules/web-socket";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    auth,
    webSocket
  }
});
