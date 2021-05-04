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
      <ChatForm :activeChat="activeChat" />
    </v-card>
  </v-menu>
</template>

<script>
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
        global: [],
        room: []
      },
      activeChat: "global"
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
    messageToClient(data) {
      this.chats.global.push(data);
    }
  },

  computed: {
    chatTabs() {
      return Object.keys(this.chats);
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
