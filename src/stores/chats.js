import { defineStore } from "pinia";

import { MESSAGE_RECEIVER_TYPES } from "@enums";
const { GLOBAL } = MESSAGE_RECEIVER_TYPES;

export const useStoreChats = defineStore("chats", {
  state: () => ({
    chats: {
      GLOBAL: {
        key: GLOBAL,
        messages: [],
      },
    },
  }),
  getters: {
    chatTabs: (state) => Object.keys(state.chats),
  },
  actions: {
    setChat(chatName, chatData) {
      this.chats[chatName] = chatData;
    },
    pushMessageToChatChat(chatName, messageData) {
      this.chats[chatName].messages.push(messageData);
    },
    deleteChat(chatName) {
      delete this.chats[chatName];
    },
  },
});
