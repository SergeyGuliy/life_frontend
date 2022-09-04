import { api } from "@api";
import { MESSAGE_RECEIVER_TYPES } from "@enums";
const { GLOBAL, ROOM, PRIVATE } = MESSAGE_RECEIVER_TYPES;
import { chat_messageToClient } from "@constants/ws/chat.js";
import {
  rooms_userLeaveRoom,
  rooms_userJoinRoom
} from "@constants/ws/rooms.js";

import { $chatKeys } from "@composable/$chatKeys";
const { getUserChatKey } = $chatKeys();

export default {
  async mounted() {
    this.$initSocketListener(this.intiComponent);
  },

  methods: {
    async intiComponent() {
      await this.fetchGlobalMessages();
      await this.fetchPrivateMessages();
      await this.fetchRoomMessages();

      this.$busInit({
        writeMessageToUser: this.writeMessageToUser
      });

      this.$socketInit({
        [chat_messageToClient]: this.messageToClient,
        [rooms_userJoinRoom]: this.fetchRoomMessages,
        [rooms_userLeaveRoom]: this.userLeaveRoom
      });
    },

    async messageToClient(messageToClient) {
      const {
        messageSender,
        messageReceiverType,
        messageReceiverUserId
      } = messageToClient;
      if (messageReceiverType === GLOBAL) {
        this.pushMessageToChatChat(GLOBAL, messageToClient);
      } else if (messageReceiverType === ROOM) {
        this.pushMessageToChatChat(ROOM, messageToClient);
      } else if (messageReceiverType === PRIVATE && messageReceiverUserId) {
        const userId =
          messageSender.userId === this.$user.userId
            ? messageReceiverUserId
            : messageSender.userId;
        await this.createUserChat(userId);
        const userChatKey = getUserChatKey(userId);
        this.pushMessageToChatChat(userChatKey, messageToClient);
      }
    },
    userLeaveRoom() {
      this.$bus.emit("userLeaveChat");
      this.$store.commit("chats/deleteChat", ROOM);
    },
    async writeMessageToUser(userId) {
      await this.createUserChat(userId);
      const chatTab = getUserChatKey(userId);
      this.$bus.emit("openChat");
      this.$bus.emit("activateChat", chatTab);
    },

    setChat(chatName, chatData) {
      this.$store.commit("chats/setChat", { chatName, chatData });
    },
    pushMessageToChatChat(chatName, messageData) {
      this.$store.commit("chats/pushMessageToChatChat", {
        chatName,
        messageData
      });
    },
    async createUserChat(userId) {
      const userChatKey = getUserChatKey(userId);
      if (!this.$chats[userChatKey]) {
        this.setChat(userChatKey, {
          messages: [],
          key: PRIVATE,
          userId,
          userData: await this.$dictionares.getOrUpdateUser(userId)
        });
      }
    },
    async fetchGlobalMessages() {
      const messages = (await api.chats.getGlobalMessages()).data;
      this.setChat(GLOBAL, {
        key: GLOBAL,
        messages
      });
    },
    async fetchRoomMessages() {
      if (this.$user.roomJoinedId) {
        this.setChat(ROOM, {
          key: ROOM,
          messages: (await api.chats.getRoomMessages()).data,
          roomId: this.$user.roomJoinedId
        });
      }
    },
    async fetchPrivateMessages() {
      const messages = (await api.chats.getPrivateMessages()).data;
      const messageWithUsers = messages.filter(
        message => message.messageReceiverUserId
      );
      const usersIds = [];
      messageWithUsers.forEach(message => {
        if (!usersIds.includes(message.messageReceiverUserId)) {
          if (message.messageReceiverUserId !== this.$user.userId) {
            usersIds.push(message.messageReceiverUserId);
          } else {
            usersIds.push(message.messageSender.userId);
          }
        }
      });
      for (let userId of usersIds) {
        let user = messageWithUsers.find(
          message =>
            message.messageReceiverUserId === userId ||
            message.messageSender.userId === userId
        );
        await this.createUserChat(userId);
        const userChatKey = getUserChatKey(userId);
        this.setChat(userChatKey, {
          key: PRIVATE,
          userId:
            user.messageReceiverUserId === this.$user.userId
              ? user.messageSender.userId
              : user.messageReceiverUserId,
          userData:
            user.messageReceiverUserId === this.$user.userId
              ? user.messageSender
              : await this.$dictionares.getOrUpdateUser(
                  user.messageReceiverUserId
                ),
          messages: messageWithUsers.filter(
            message =>
              message.messageReceiverUserId === userId ||
              message.messageSender.userId === userId
          )
        });
      }
    }
  }
};
