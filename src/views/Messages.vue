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
// import { MESSAGE_RECEIVER_TYPES } from "@enums.js";
// const { GLOBAL, ROOM } = MESSAGE_RECEIVER_TYPES;

import { defineAsyncComponent } from "vue";

import { useBus } from "../composable/useBus";
const { busInit } = useBus();

export default {
  name: "Messages",

  components: {
    ChatForm: defineAsyncComponent(() =>
      import("@components/layouts/Chat/ChatForm.vue")
    ),
    ChatBody: defineAsyncComponent(() =>
      import("@components/layouts/Chat/ChatBody.vue")
    ),
    ChatHeader: defineAsyncComponent(() =>
      import("@components/layouts/Chat/ChatHeader.vue")
    ),
    ChatTabs: defineAsyncComponent(() =>
      import("@components/layouts/Chat/ChatTabs.vue")
    ),
  },

  mounted() {
    busInit({
      activateChat: this.activateChat,
      openChat: this.openChat,
      userLeaveChat: this.userLeaveChat,
    });
  },

  data() {
    return {
      activeChat: "GLOBAL",
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
      if (this.activeChat === "ROOM") {
        this.activeChat = "GLOBAL";
      }
    },
  },
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
