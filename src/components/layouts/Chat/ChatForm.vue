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
          :disabled="!isRecordingAvaliable"
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

<script>
import {
  MessageReceiverTypes,
  MessageTypes
} from "../../../assets/helpers/enums";
import recordingMixin from "../../../mixins/recordingMixin";
import { api } from "../../../assets/helpers/api";

const { ROOM, PRIVATE } = MessageReceiverTypes;
const { TEXT, VOICE } = MessageTypes;

export default {
  name: "ChatForm",
  mixins: [recordingMixin],
  components: {
    ChatAudio: () => import("./ChatAudio")
  },
  props: {
    activeChat: {
      required: true,
      type: String
    },
    chats: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      newMessage: ""
    };
  },
  methods: {
    blobToFile(theBlob, fileName) {
      theBlob.lastModifiedDate = new Date();
      theBlob.name = fileName;
      return theBlob;
    },
    async sendMessage(event) {
      event.preventDefault();
      if (!(this.newMessage.length || this.audio)) return;
      const activeChat = this.$chat.getTypeFromChatKey(this.activeChat);
      const messageData = {
        messageSender: this.$user.userId,
        messageReceiverType: activeChat,
        messageType: this.audio ? VOICE : TEXT
      };
      if (this.audio) {
        const messageVoiceFile = new File(
          [this.audio.audioBlob],
          "messageVoice.pm3",
          {
            lastModified: new Date().getTime(),
            type: "audio/mpeg"
          }
        );

        const formData = new FormData();
        formData.append("messageVoiceFile", messageVoiceFile);
        let audioId = (await api.uploader.uploadVoice(formData)).data;
        messageData.messageVoice = audioId;
      } else {
        messageData.messageText = this.newMessage;
      }
      if (activeChat === ROOM) {
        messageData.messageReceiverRoomId = this.chats[ROOM].roomId;
      }
      if (activeChat === PRIVATE) {
        messageData.messageReceiverUserId = this.$chat.getUserIdFromChatKey(
          this.activeChat
        );
      }
      this.$socket.emit("messageToServer", messageData);
      this.newMessage = "";
      this.audio = null;
    }
  }
};
</script>

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
