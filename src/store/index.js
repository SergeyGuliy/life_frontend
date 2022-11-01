import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import user from "./modules/user";
import dictionaries from "./modules/dictionaries";
import modals from "./modules/modals";
import chats from "./modules/chats";
import friends from "./modules/friends";
import game from "./modules/game";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    auth,
    modals,
    user,
    dictionaries,
    chats,
    friends,
    game
  }
});
