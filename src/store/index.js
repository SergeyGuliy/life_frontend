import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import user from "./modules/user";
import userSettings from "./modules/userSettings";
import dictionaries from "./modules/dictionaries";
import modals from "./modules/modals";
import chats from "./modules/chats";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    auth,
    modals,
    user,
    userSettings,
    dictionaries,
    chats
  }
});
