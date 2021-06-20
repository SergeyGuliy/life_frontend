<template>
  <div class="py-2 px-4">
    <v-tabs-items v-model="activeChat">
      <v-tab-item
        :value="chatTab"
        v-for="(chatTab, index) in chatTabs"
        :key="index"
        :href="`#${chatTab}`"
      >
        <v-card-text class="chat-body pa-0">
          <v-list ref="chat" id="logs" class="chat-body__inner">
            <ChatMessage
              v-for="(message, index) in chats[activeChat].messages"
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
export default {
  name: "ChatBody",
  components: {
    ChatMessage: () => import("./ChatMessage")
  },
  props: {
    activeChat: {
      required: true,
      type: String
    },
    chats: {
      required: true,
      type: Object
    },
    chatTabs: {
      required: true,
      type: Array
    }
  }
};
</script>
