<template>
  <Grid class="messages" :leftCol="[2]" :rightCol="[10]">
    <template #leftCol>
      <Title :title="$t('pages.chats.chatsList')" />
      <ChatTabs v-model="activeChat" :vertical="true" />
    </template>
    <template #rightCol>
      <div class="messages__body">
        <ChatHeader :showClose="false" :activeChat="activeChat" />
        <ChatBody :activeChat="activeChat" :isSmall="false" />
        <ChatForm :activeChat="activeChat" />
      </div>
    </template>
  </Grid>
</template>

<script>
import { MESSAGE_RECEIVER_TYPES } from "@enums";
const { GLOBAL, ROOM } = MESSAGE_RECEIVER_TYPES;

export default {
  name: "Messages",
  components: {
    ChatForm: () => import("@components/layouts/Chat/ChatForm"),
    ChatBody: () => import("@components/layouts/Chat/ChatBody"),
    ChatHeader: () => import("@components/layouts/Chat/ChatHeader"),
    ChatTabs: () => import("@components/layouts/Chat/ChatTabs")
  },

  mounted() {
    this.$bus.on("activateChat", this.activateChat);
    this.$bus.on("openChat", this.openChat);
    this.$bus.on("userLeaveChat", this.userLeaveChat);
  },
  beforeDestroy() {
    this.$bus.off("activateChat", this.activateChat);
    this.$bus.off("openChat", this.openChat);
    this.$bus.off("userLeaveChat", this.userLeaveChat);
  },
  data() {
    return {
      activeChat: GLOBAL
    };
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

<style lang="scss">
.messages {
  width: 100%;
  .grid__card--rightCol {
    padding: 0 !important;
  }
  .messages__body {
    height: 100%;
    display: flex;
    flex-direction: column;
    #chat_body {
      overflow: auto;
      flex: 1 1 auto;
    }
  }
}
</style>
