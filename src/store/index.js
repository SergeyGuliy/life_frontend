import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import user from "./modules/user";
import dictionaries from "./modules/dictionaries";
import modals from "./modules/modals";
import chats from "./modules/chats";
import friends from "./modules/friends";
import game from "./modules/game";
import room from "./modules/room";

Vue.use(Vuex);

export const store = new Vuex.Store({
  strict: true,
  modules: {
    auth,
    modals,
    user,
    dictionaries,
    chats,
    friends,
    game,
    room,
  },
});
