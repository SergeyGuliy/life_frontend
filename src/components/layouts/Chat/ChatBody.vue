<script setup>
import { defineProps, onBeforeUnmount, onMounted, ref } from "vue";
import ResizeObserver from "resize-observer-polyfill";

import ChatMessage from "./Message/ChatMessage.vue";

import { useStoreChats } from "@stores/chats";

const { chats, chatTabs } = useStoreChats();

defineProps({
  activeChat: {
    required: true,
    type: [String, Number],
  },
  isSmall: {
    default: () => true,
    type: Boolean,
  },
});

const ro = ref(null);

onMounted(() => {
  const chatBody = document.querySelector("#chat_body");
  const chatBodyInner = document.querySelector("#chat_body_inner");
  function scrollToBottom() {
    chatBody.scrollTo(0, chatBodyInner.scrollHeight);
  }
  ro.value = new ResizeObserver(scrollToBottom).observe(chatBodyInner);
});

onBeforeUnmount(() => (ro.value = null));
</script>

<template>
  <div
    class="py-2 px-4"
    id="chat_body"
    :class="{ 'chat-body__inner-small': isSmall }"
  >
    <v-window id="chat_body_inner">
      <template v-if="chats[activeChat] && chats[activeChat].messages">
        <v-window-item
          :value="chatTab"
          v-for="(chatTab, index) in chatTabs"
          :key="index"
          :href="`#${chatTab}`"
        >
          <v-card-text class="chat-body pa-0">
            <v-list>
              <ChatMessage
                v-for="(message, index) in chats[activeChat].messages"
                :key="index"
                :message="message"
              />
            </v-list>
          </v-card-text>
        </v-window-item>
      </template>
    </v-window>
  </div>
</template>

<style lang="scss">
#chat_body.chat-body__inner-small {
  min-height: 500px;
  max-height: 500px;
  overflow: auto;
}
</style>
