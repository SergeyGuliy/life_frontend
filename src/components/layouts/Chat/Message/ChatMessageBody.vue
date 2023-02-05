<template>
  <div>
    <v-card-text class="py-2" v-if="message.messageType === 'TEXT'">
      <p>{{ message.messageText }}</p>
    </v-card-text>
    <v-card-text class="pt-1 pb-4 px-1" v-else>
      <ChatAudio
        class="mt-1"
        :file="$filters.voiceLink(message.messageVoice)"
      />
    </v-card-text>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "ChatMessageBody",

  props: {
    message: {
      type: Object,
      required: true,
    },
  },

  components: {
    ChatAudio: defineAsyncComponent(() => import("../ChatAudio.vue")),
  },
};
</script>

<style scoped></style>
