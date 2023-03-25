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
        ref="RefChatMessageHeader"
      />
    </v-card-actions>
    <ChatMessageBody :message="message" />
  </v-card>
</template>

<script setup>
import { computed, ref } from "vue";

import ChatMessageHeader from "./ChatMessageHeader.vue";
import ChatMessageContext from "./ChatMessageContext.vue";
import ChatMessageBody from "./ChatMessageBody.vue";

import { useBus, useUsers } from "@composable";

const { myUser } = useUsers();
const { busEmit } = useBus();

const props = defineProps({
  message: { required: true, type: Object },
});

const RefChatMessageHeader = ref(null);

const isYouAuthor = computed(
  () => props.message.messageSender.userId === myUser.userId
);

function showContextMenu(e) {
  e.preventDefault();
  busEmit("openContext", props.message.messageId);
  if (isYouAuthor.value) return;
  RefChatMessageHeader.value.showContextMenu(e);
}
</script>
