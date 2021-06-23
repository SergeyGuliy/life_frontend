import { api } from "../utils/api";
import { MESSAGE_RECEIVER_TYPES } from "../utils/enums";
const { GLOBAL, ROOM, PRIVATE } = MESSAGE_RECEIVER_TYPES;

export default {
  async mounted() {
    await this.fetchGlobalMessages();
    await this.fetchPrivateMessages();
    this.$bus.on("writeMessageToUser", this.writeMessageToUser);
  },

  beforeDestroy() {
    this.$bus.off("writeMessageToUser", this.writeMessageToUser);
  },

  sockets: {
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
        const userChatKey = this.$chat.getUserChatKey(userId);
        this.pushMessageToChatChat(userChatKey, messageToClient);
      }
    },
    async userJoinRoom() {
      console.log("userJoinRoom");
      await this.fetchRoomMessages();
    },
    userLeaveRoom() {
      this.$store.commit("chats/deleteChat", ROOM);
    }
  },
  methods: {
    async writeMessageToUser(userData) {
      await this.createUserChat(userData);
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
        const userChatKey = this.$chat.getUserChatKey(userId);
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
    },
    async createUserChat(user) {
      const userData = await this.$dictionares.getOrUpdateUser(user);
      const userChatKey = this.$chat.getUserChatKey(userData);
      if (!this.$chats[userChatKey]) {
        this.setChat(userChatKey, {
          messages: [],
          key: PRIVATE,
          userId: userData.userId,
          userData
        });
      }
    }
  }
};
