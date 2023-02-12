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
        <v-icon> mdi-chat </v-icon>
      </v-btn>
    </template>
    <v-card class="elevation-12" width="500">
      <ChatHeader v-model="isChatOpened" :activeChat="activeChat" />
      <ChatTabs v-model="activeChat" />
      <ChatBody :activeChat="activeChat" />
      <ChatForm :activeChat="activeChat" />
    </v-card>
  </v-menu>
</template>

<script setup>
import { ref } from "vue";

import ChatForm from "./ChatForm.vue";
import ChatBody from "./ChatBody.vue";
import ChatTabs from "./ChatTabs.vue";
import ChatHeader from "./ChatHeader.vue";

import { useBus } from "@composable/useBus";
const { busInit } = useBus();

import { MESSAGE_RECEIVER_TYPES } from "@enums";
const { GLOBAL, ROOM } = MESSAGE_RECEIVER_TYPES;

const isChatOpened = ref(false);
const activeChat = ref(GLOBAL);

busInit({
  activateChat: activateChat,
  openChat: openChat,
  userLeaveChat: userLeaveChat,
});

function openChat() {
  isChatOpened.value = true;
}
function activateChat(chatName) {
  activeChat.value = chatName;
}
function userLeaveChat() {
  if (activeChat.value === ROOM) {
    activeChat.value = GLOBAL;
  }
}
</script>
