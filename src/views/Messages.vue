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
import { MESSAGE_RECEIVER_TYPES } from "@enums.js";
const { GLOBAL, ROOM } = MESSAGE_RECEIVER_TYPES;

export default {
  name: "Messages",
  components: {
    ChatForm: () => import("@components/layouts/Chat/ChatForm.vue"),
    ChatBody: () => import("@components/layouts/Chat/ChatBody.vue"),
    ChatHeader: () => import("@components/layouts/Chat/ChatHeader.vue"),
    ChatTabs: () => import("@components/layouts/Chat/ChatTabs.vue")
  },

  mounted() {
    this.$busInit({
      activateChat: this.activateChat,
      openChat: this.openChat,
      userLeaveChat: this.userLeaveChat
    });
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
