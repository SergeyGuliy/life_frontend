// eslint-disable-next-line no-unused-vars
import { myVue } from "../../main";
import { MESSAGE_RECEIVER_TYPES } from "../../assets/helpers/enums";
// eslint-disable-next-line no-unused-vars
const { GLOBAL, ROOM, PRIVATE } = MESSAGE_RECEIVER_TYPES;
import Vue from "vue";

export default {
  namespaced: true,
  state: {
    chats: {
      GLOBAL: {
        key: GLOBAL,
        messages: []
      }
    }
  },
  mutations: {
    setChat(state, { chatName, chatData }) {
      Vue.set(state.chats, chatName, chatData);
    },
    pushMessageToChatChat(state, { chatName, messageData }) {
      state.chats[chatName].messages.push(messageData);
    },
    deleteChat(state, chatName) {
      Vue.delete(state.chats, chatName);
    }
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    // async ffff({ commit }, data) {}
  }
};
