// import { MESSAGE_RECEIVER_TYPES } from "@enums";
// const { GLOBAL, ROOM, PRIVATE } = MESSAGE_RECEIVER_TYPES;
import { chat_messageToClient } from "@constants/ws/chats.js";
import {
  rooms_userLeaveRoom,
  rooms_userJoinRoom,
} from "@constants/ws/rooms.js";

import { API_getGlobalMessages, API_getPrivateMessages } from "@api/chats";

import { $chatKeys } from "@composable/$chatKeys";
const { getUserChatKey } = $chatKeys();

import { useSocket } from "@composable/useSocket";
const { onSocketInit } = useSocket();

import { useBus } from "@composable/useBus";
import { useUsers } from "../composable/useUsers";
const { busInit, busEmit } = useBus();

export default {
  async created() {
    await this.fetchGlobalMessages();
    await this.fetchPrivateMessages();
    await this.fetchRoomMessages();

    busInit({ writeMessage: this.writeMessage });

    onSocketInit({
      [chat_messageToClient]: this.messageToClient,
      [rooms_userJoinRoom]: this.fetchRoomMessages,
      [rooms_userLeaveRoom]: this.userLeaveRoom,
    });
  },

  setup() {
    const { myUser } = useUsers();
    return { myUser };
  },

  methods: {
    async messageToClient(messageToClient) {
      // const {
      //   messageSender,
      //   messageReceiverType,
      //   messageReceiverUserId
      // } = messageToClient;
      // if (messageReceiverType === GLOBAL) {
      //   this.pushMessageToChatChat(GLOBAL, messageToClient);
      // } else if (messageReceiverType === ROOM) {
      //   this.pushMessageToChatChat(ROOM, messageToClient);
      // } else if (messageReceiverType === PRIVATE && messageReceiverUserId) {
      //   const userId =
      //     messageSender.userId === this.myUser.userId
      //       ? messageReceiverUserId
      //       : messageSender.userId;
      //   await this.createUserChat(userId);
      //   const userChatKey = getUserChatKey(userId);
      //   this.pushMessageToChatChat(userChatKey, messageToClient);
      // }
    },
    userLeaveRoom() {
      busEmit("userLeaveChat");
      // this.$store.commit("chats/deleteChat", ROOM);
    },
    async writeMessage(userId) {
      await this.createUserChat(userId);
      const chatTab = getUserChatKey(userId);
      busEmit("openChat");
      busEmit("activateChat", chatTab);
    },

    setChat(chatName, chatData) {
      this.$store.commit("chats/setChat", { chatName, chatData });
    },
    pushMessageToChatChat(chatName, messageData) {
      this.$store.commit("chats/pushMessageToChatChat", {
        chatName,
        messageData,
      });
    },
    async createUserChat(userId) {
      const userChatKey = getUserChatKey(userId);
      if (!this.$chats[userChatKey]) {
        this.setChat(userChatKey, {
          messages: [],
          // key: PRIVATE,
          userId,
          userData: await this.$filters.dictGetUserById(userId),
        });
      }
    },
    async fetchGlobalMessages() {
      API_getGlobalMessages().then((messages) => {
        // this.setChat(GLOBAL, {
        //   key: GLOBAL,
        //   messages
        // });
      });
    },
    async fetchRoomMessages() {
      if (this.myUser?.roomJoinedId) {
        // this.setChat(ROOM, {
        //   key: ROOM,
        //   messages: await index.chats.getRoomMessages(),
        //   roomId: this.myUser.roomJoinedId
        // });
      }
    },
    async fetchPrivateMessages() {
      const messages = await API_getPrivateMessages();
      const messageWithUsers = messages.filter(
        (message) => message.messageReceiverUserId
      );
      const usersIds = [];
      messageWithUsers.forEach((message) => {
        if (!usersIds.includes(message.messageReceiverUserId)) {
          if (message.messageReceiverUserId !== this.myUser.userId) {
            usersIds.push(message.messageReceiverUserId);
          } else {
            usersIds.push(message.messageSender.userId);
          }
        }
      });
      for (let userId of usersIds) {
        let user = messageWithUsers.find(
          (message) =>
            message.messageReceiverUserId === userId ||
            message.messageSender.userId === userId
        );
        await this.createUserChat(userId);
        const userChatKey = getUserChatKey(userId);
        // this.setChat(userChatKey, {
        //   key: PRIVATE,
        //   userId:
        //     user.messageReceiverUserId === this.myUser.userId
        //       ? user.messageSender.userId
        //       : user.messageReceiverUserId,
        //   userData:
        //     user.messageReceiverUserId === this.myUser.userId
        //       ? user.messageSender
        //       : await this.$filters.dictGetUserById(user.messageReceiverUserId),
        //   messages: messageWithUsers.filter(
        //     message =>
        //       message.messageReceiverUserId === userId ||
        //       message.messageSender.userId === userId
        //   )
        // });
      }
    },
  },
};
