<script setup>
import { ref } from "vue";

import ChatForm from "./ChatForm.vue";
import ChatBody from "./ChatBody.vue";
import ChatTabs from "./ChatTabs.vue";
import ChatHeader from "./ChatHeader.vue";

import { useBus } from "@composable";
import { MESSAGE_RECEIVER_TYPES } from "@enums";

const { busInit } = useBus();
const { GLOBAL, ROOM } = MESSAGE_RECEIVER_TYPES;

const isChatOpened = ref(false);
const activeChat = ref(GLOBAL);

const toggleChat = () => (isChatOpened.value = !isChatOpened.value);

busInit({
  activateChat: (chatName) => (activeChat.value = chatName),
  openChat: () => (isChatOpened.value = true),
  userLeaveChat: () => {
    if (activeChat.value === ROOM) activeChat.value = GLOBAL;
  },
});
</script>

<template>
  <v-btn color="blue darken-2 chat-activator" @click="toggleChat">
    <v-icon> mdi-chat</v-icon>
  </v-btn>
  <v-card class="elevation-12 chat-activator" width="500" v-if="isChatOpened">
    <ChatHeader v-model="isChatOpened" :activeChat="activeChat" />
    <ChatTabs v-model="activeChat" />
    <ChatBody :activeChat="activeChat" />
    <ChatForm :activeChat="activeChat" />
  </v-card>
</template>

<style lang="scss">
.chat-activator {
  position: fixed;
  bottom: 10px;
  right: 10px;
}
</style>
