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
      <ChatHeader v-model="isChatOpened" />
      <ChatTabs v-model="activeChat" :chatTabs="$chatTabs" :chats="$chats" />
      <ChatBody
        :activeChat="activeChat"
        :chatTabs="$chatTabs"
        :chats="$chats"
      />
      <ChatForm :activeChat="activeChat" :chats="$chats" />
    </v-card>
  </v-menu>
</template>

<script>
import { MESSAGE_RECEIVER_TYPES } from "../../../assets/helpers/enums";
const { GLOBAL } = MESSAGE_RECEIVER_TYPES;
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
    this.$bus.on("writeMessageToUser", this.writeMessageToUser);
  },
  beforeDestroy() {
    this.$bus.off("writeMessageToUser", this.writeMessageToUser);
  },
  methods: {
    async writeMessageToUser(userData) {
      setTimeout(() => {
        this.isChatOpened = true;
        this.activeChat = this.$chat.getUserChatKey(userData);
      }, 1);
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
