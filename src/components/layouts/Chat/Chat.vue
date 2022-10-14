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
    <!--    <pre>{{$chatTabs}}</pre>-->
    <v-card class="elevation-12" width="500">
      <ChatHeader v-model="isChatOpened" :activeChat="activeChat" />
      <ChatTabs v-model="activeChat" />
      <ChatBody :activeChat="activeChat" />
      <ChatForm :activeChat="activeChat" />
    </v-card>
  </v-menu>
</template>

<script>
import { MESSAGE_RECEIVER_TYPES } from "@enums";
const { GLOBAL, ROOM } = MESSAGE_RECEIVER_TYPES;
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
      activeChat: GLOBAL
    };
  },

  mounted() {
    this.$busInit({
      activateChat: this.activateChat,
      openChat: this.openChat,
      userLeaveChat: this.userLeaveChat
    });
  },

  methods: {
    async openChat() {
      this.isChatOpened = true;
    },
    activateChat(chatName) {
      this.activeChat = chatName;
    },
    userLeaveChat() {
      if (this.activeChat === ROOM) {
        this.activeChat = GLOBAL;
      }
    }
  }
};
</script>
