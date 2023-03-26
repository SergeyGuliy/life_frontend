<script setup>
import { defineProps, ref } from "vue";

import ChatAudio from "./ChatAudio.vue";

import { API_uploadVoice } from "@api";
import { MESSAGE_RECEIVER_TYPES, MESSAGE_TYPES } from "@enums";
import { chat_messageToServer } from "@constants/ws/chats.mjs";

import { useRecording, useChatKeys, useSocket, useUsers } from "@composable";
import { useStoreChats } from "@stores";

const { ROOM, PRIVATE } = MESSAGE_RECEIVER_TYPES;
const { TEXT, VOICE } = MESSAGE_TYPES;

const { getUserIdFromChatKey, getTypeFromChatKey } = useChatKeys();
const { chats } = useStoreChats();
const { myUser } = useUsers();
const { socketEmit } = useSocket();
const {
  isRecording,
  startRecording,
  stopRecording,
  deleteVoice,
  audio,
  recordingTime,
  isRecordingAvailable,
} = useRecording();

const props = defineProps({
  activeChat: {
    required: true,
    type: [String, Number],
  },
});

const newMessage = ref("");

async function sendMessage(event) {
  event.preventDefault();
  if (!(newMessage.value.length || audio)) return;
  const activeChat = getTypeFromChatKey(props.activeChat);
  const messageData = {
    messageSender: myUser.userId,
    messageReceiverType: activeChat,
    messageType: audio.value ? VOICE : TEXT,
  };
  if (audio.value) {
    const voice = new File([audio.value.audioBlob], "voice.pm3", {
      lastModified: new Date().getTime(),
      type: "audio/mpeg",
    });

    const formData = new FormData();
    formData.append("voice", voice);
    await API_uploadVoice(formData).then((audioId) => {
      messageData.messageVoice = audioId;
    });
  } else {
    messageData.messageText = newMessage.value;
  }
  if (activeChat === ROOM) {
    messageData.messageReceiverRoomId = chats[ROOM].roomId;
  }
  if (activeChat === PRIVATE) {
    messageData.messageReceiverUserId = getUserIdFromChatKey(props.activeChat);
  }
  console.log(messageData);

  socketEmit(chat_messageToServer, messageData);
  newMessage.value = "";
  audio.value = null;
}
</script>

<template>
  <v-card-actions class="ChatForm">
    <v-form class="d-flex align-stretch" style="width: 100%">
      <ChatAudio v-if="audio && audio.audioUrl" :file="audio.audioUrl" />

      <v-textarea
        v-else-if="!isRecording"
        v-model="newMessage"
        label="Message"
        outlined
        full-width
        no-resize
        rows="2"
        hide-details
        @keydown.enter="sendMessage"
      />
      <v-card
        v-else-if="isRecording"
        width="100%"
        class="d-flex align-center justify-center recording-box"
      >
        {{ recordingTime.toFixed(1) }}
      </v-card>
      <div class="d-flex flex-column">
        <v-btn
          dark
          small
          color="primary"
          class="ml-2 mb-2"
          @click="sendMessage"
        >
          <v-icon dark>mdi-send</v-icon>
        </v-btn>
        <v-btn
          v-if="audio && audio.audioUrl"
          dark
          small
          color="red"
          class="ml-2 mb-2"
          @click="deleteVoice"
        >
          <v-icon dark>mdi-delete</v-icon>
        </v-btn>
        <v-btn
          v-else
          :disabled="!isRecordingAvailable"
          dark
          small
          :color="isRecording ? 'red' : 'primary'"
          class="ml-2"
          v-longclick="() => startRecording()"
          @click="isRecording ? stopRecording() : startRecording()"
        >
          <v-icon dark>
            {{ isRecording ? "mdi-microphone-settings" : "mdi-microphone" }}
          </v-icon>
        </v-btn>
      </div>
    </v-form>
  </v-card-actions>
</template>

<style lang="scss">
.ChatForm {
  min-height: 80px;
  max-height: 80px;
  .v-input.v-textarea {
    height: 72px;
  }
  .recording-box {
    height: 72px;
  }
}
</style>
