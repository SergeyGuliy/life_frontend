import Vuex from "vuex";
import auth from "./modules/auth";
import user from "./modules/user";
import dictionaries from "./modules/dictionaries";
import modals from "./modules/modals";
import chats from "./modules/chats";
import friends from "./modules/friends";

export default Vuex.createStore({
  strict: true,
  modules: {
    auth,
    modals,
    user,
    dictionaries,
    chats,
    friends
  }
});
