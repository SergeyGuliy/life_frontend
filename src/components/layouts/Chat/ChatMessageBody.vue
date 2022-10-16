<template>
  <div>
    <v-card-text class="py-2" v-if="message.messageType === 'TEXT'">
      <p>{{ message.messageText }}</p>
    </v-card-text>
    <v-card-text class="pt-1 pb-4 px-1" v-else>
      <ChatAudio class="mt-1" :file="message.messageVoice | voiceLink" />
    </v-card-text>
  </div>
</template>

<script>
export default {
  name: "ChatMessageBody",

  props: {
    message: {
      type: Object,
      required: true
    }
  },

  components: {
    ChatAudio: () => import("./ChatAudio")
  }
};
</script>

<style scoped></style>
