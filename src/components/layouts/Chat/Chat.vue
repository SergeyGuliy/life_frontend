<template>
  <v-menu
    v-model="isChatOpened"
    offset-y
    class="lang-selector"
    :close-on-click="false"
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        color="blue darken-2"
        absolute
        right
        bottom
      >
        <v-icon>
          mdi-chat
        </v-icon>
      </v-btn>
    </template>
    <v-card class="elevation-12" width="500">
      <!--      <pre>{{ chatTabs }}</pre>-->
      <!--      <template v-for="(chat, index) in chats">-->
      <!--        <pre v-if="chat.key === 'PRIVATE'" :key="index">{{ chat }}</pre>-->
      <!--      </template>-->
      <ChatHeader v-model="isChatOpened" />
      <ChatTabs v-model="activeChat" :chatTabs="chatTabs" :chats="chats" />
      <ChatBody
        :activeChat="activeChat"
        :chatTabs="chatTabs"
        :chats="chats"
        @writeMessageToUser="writeMessageToUser"
      />
      <ChatForm :activeChat="activeChat" :chats="chats" />
    </v-card>
  </v-menu>
</template>

<script>
import { MessageReceiverTypes } from "../../../assets/helpers/enums";
const { GLOBAL, ROOM, PRIVATE } = MessageReceiverTypes;
import { api } from "../../../assets/helpers/api";
export default {
  name: "Chat",
  components: {
    ChatForm: () => import("./ChatForm"),
    ChatBody: () => import("./ChatBody"),
    ChatTabs: () => import("./ChatTabs"),
    ChatHeader: () => import("./ChatHeader")
  },
  data() {
    return {
      isChatOpened: false,
      chats: {
        GLOBAL: {
          key: GLOBAL,
          messages: []
        }
      },
      activeChat: GLOBAL
    };
  },
  watch: {
    logs() {
      // this.$nextTick(() => {
      //   this.$refs.chat.$el.scrollTop = this.$refs.chat.$el.scrollHeight;
      // });
    }
  },
  sockets: {
    async messageToClient(messageToClient) {
      const {
        messageSender,
        messageReceiverType,
        messageReceiverUserId
      } = messageToClient;
      if (messageReceiverType === GLOBAL) {
        this.chats[GLOBAL].messages.push(messageToClient);
      } else if (messageReceiverType === ROOM) {
        this.chats[ROOM].messages.push(messageToClient);
      } else if (messageReceiverType === PRIVATE && messageReceiverUserId) {
        const userId =
          messageSender.userId === this.$user.userId
            ? messageReceiverUserId
            : messageSender.userId;
        await this.createUserChat(userId);
        const userChatKey = this.$chat.getUserChatKey(userId);
        this.chats[userChatKey].messages.push(messageToClient);
      }
    },
    async userJoinRoom() {
      await this.fetchRoomMessages();
    },
    userLeaveRoom() {
      this.$delete(this.chats, ROOM);
    }
  },

  computed: {
    chatTabs() {
      return Object.keys(this.chats);
    }
  },
  async mounted() {
    await this.fetchGlobalMessages();
    await this.fetchRoomMessages();
    await this.fetchPrivateMessages();
    this.$bus.on("writeMessageToUser", this.writeMessageToUser);
  },
  beforeDestroy() {
    this.$bus.off("writeMessageToUser", this.writeMessageToUser);
  },
  methods: {
    async fetchGlobalMessages() {
      this.chats[GLOBAL].messages = (await api.chats.getGlobalMessages()).data;
    },
    async fetchRoomMessages() {
      if (this.$user.roomJoinedId) {
        this.$set(this.chats, ROOM, {
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
        await this.createUserChat(userId);
        const userChatKey = this.$chat.getUserChatKey(userId);
        this.$set(
          this.chats[userChatKey],
          "messages",
          messageWithUsers.filter(
            message =>
              message.messageReceiverUserId === userId ||
              message.messageSender.userId === userId
          )
        );
      }
    },

    async writeMessageToUser(userData) {
      this.isChatOpened = true;
      await this.createUserChat(userData);
      this.activeChat = this.$chat.getUserChatKey(userData);
    },

    async createUserChat(user) {
      const userData = await this.$dictionares.getOrUpdateUser(user);
      const userChatKey = this.$chat.getUserChatKey(userData);
      if (!this.chats[userChatKey]) {
        this.$set(this.chats, userChatKey, {
          messages: [],
          key: PRIVATE,
          userId: userData.userId,
          userData
        });
      }
    }
  }
};
</script>

<style lang="scss">
.chat-body {
  &__inner {
    min-height: 500px;
    max-height: 500px;
    overflow: auto;
  }
}
</style>
