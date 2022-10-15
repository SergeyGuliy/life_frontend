<template>
  <v-card
    dark
    max-width="80%"
    outlined
    :class="isYouAuthor ? 'ml-auto mr-2' : 'mr-auto'"
    :color="isYouAuthor ? 'primary' : ''"
    class="mb-2"
    @contextmenu="showContextMenu"
  >
    <v-card-actions>
      <ChatMessageHeader
        :createdAt="message.createdAt"
        :messageSender="message.messageSender"
        :isYouAuthor="isYouAuthor"
      />
      <ChatMessageContext
        :messageSenderId="message.messageSender.userId"
        :messageId="message.messageId"
        ref="ChatMessageHeader"
      />
    </v-card-actions>
    <v-card-text class="py-2" v-if="message.messageType === 'TEXT'">
      <p>{{ message.messageText }}</p>
    </v-card-text>
    <v-card-text class="pt-1 pb-4 px-1" v-else>
      <ChatAudio class="mt-1" :file="message.messageVoice | voiceLink" />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ChatMessage",

  components: {
    ChatAudio: () => import("./ChatAudio"),
    ChatMessageHeader: () => import("./ChatMessageHeader"),
    ChatMessageContext: () => import("./ChatMessageContext")
  },
  props: {
    message: {
      required: true,
      type: Object
    }
  },

  computed: {
    userDataLocal(val) {
      console.log(val);
      return val;
      // const userData = this.$filters.dictGetUserById(this.userData?.userId);
      // if (this.timestamp) return userData;
      // return userData;
    },
    isYouAuthor() {
      return this.message.messageSender.userId === this.$user.userId;
    }
  },
  methods: {
    showContextMenu(e) {
      e.preventDefault();
      this.$bus.emit("openContext", this.message.messageId);
      if (this.isYouAuthor) return;
      this.$refs.ChatMessageHeader.showContextMenu(e);
    }
  }
};
</script>
