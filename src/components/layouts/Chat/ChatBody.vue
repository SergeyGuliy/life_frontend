<template>
  <div
    class="py-2 px-4"
    id="chat_body"
    :class="{ 'chat-body__inner-small': isSmall }"
  >
    <v-tabs-items v-model="activeChat" id="chat_body_inner">
      <v-tab-item
        :value="chatTab"
        v-for="(chatTab, index) in $chatTabs"
        :key="index"
        :href="`#${chatTab}`"
      >
        <v-card-text class="chat-body pa-0">
          <v-list>
            <ChatMessage
              v-for="(message, index) in $chats[activeChat].messages"
              :key="index"
              :message="message"
            />
          </v-list>
        </v-card-text>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import ResizeObserver from "resize-observer-polyfill";

export default {
  name: "ChatBody",
  components: {
    ChatMessage: () => import("./ChatMessage/ChatMessage")
  },
  props: {
    activeChat: {
      required: true,
      type: String
    },
    isSmall: {
      default: () => true,
      type: Boolean
    }
  },
  data() {
    return {
      ro: null
    };
  },
  mounted() {
    const chatBody = document.querySelector("#chat_body");
    const chatBodyInner = document.querySelector("#chat_body_inner");
    function scrollToBottom() {
      chatBody.scrollTo(0, chatBodyInner.scrollHeight);
    }
    this.ro = new ResizeObserver(scrollToBottom).observe(chatBodyInner);
  },
  beforeDestroy() {
    delete this.ro;
  }
};
</script>

<style lang="scss">
#chat_body.chat-body__inner-small {
  min-height: 500px;
  max-height: 500px;
  overflow: auto;
}
</style>
