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
      <ChatHeader v-model="isChatOpened" />
      <ChatTabs v-model="activeChat" :chatTabs="chatTabs" />
      <ChatBody :activeChat="activeChat" :chatTabs="chatTabs" :chats="chats" />
      <ChatForm :activeChat="activeChat" :chats="chats" />
    </v-card>
  </v-menu>
</template>

<script>
import { MessageReceiverTypes } from "../../assets/helpers/enums";
import { api } from "../../assets/helpers/api";

export default {
  name: "Chat",
  components: {
    ChatForm: () => import("./Chat/ChatForm"),
    ChatBody: () => import("./Chat/ChatBody"),
    ChatTabs: () => import("./Chat/ChatTabs"),
    ChatHeader: () => import("./Chat/ChatHeader")
  },
  data() {
    return {
      isChatOpened: false,
      chats: {
        GLOBAL: []
      },
      activeChat: "GLOBAL"
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
    messageToClient(messageToClient) {
      const {
        messageReceiverType
        // messageReceiverRoomId,
        // messageReceiverUserId
      } = messageToClient;
      if (messageReceiverType === MessageReceiverTypes.GLOBAL) {
        this.chats[MessageReceiverTypes.GLOBAL].messages.push(messageToClient);
      } else if (messageReceiverType === MessageReceiverTypes.ROOM) {
        this.chats[MessageReceiverTypes.ROOM].messages.push(messageToClient);
      } else if (messageReceiverType === MessageReceiverTypes.PRIVATE) {
        console.log("PRIVATE");
      }
    },
    async joinRoom() {
      await this.fetchRoomMessages();
    },
    userLeaveRoom() {
      this.$delete(this.chats, MessageReceiverTypes.ROOM);
    }
  },

  computed: {
    chatTabs() {
      return Object.keys(this.chats);
    }
  },
  async mounted() {
    await this.fetchGlobalMessages();
    await this.fetchPrivateMessages();
    await this.fetchRoomMessages();
  },
  methods: {
    async fetchGlobalMessages() {
      this.chats.GLOBAL.messages = (await api.chats.getGlobalMessages()).data;
    },
    async fetchPrivateMessages() {
      const messages = (await api.chats.getPrivateMessages()).data;
      console.log(messages);
    },
    async fetchRoomMessages() {
      if (this.$user.roomJoinedId) {
        this.$set(this.chats, MessageReceiverTypes.ROOM, {
          roomId: this.$user.roomJoinedId,
          messages: (await api.chats.getRoomMessages()).data
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
