<template>
  <v-card-actions>
    <v-form @submit.prevent="submit" class="d-flex" style="width: 100%">
      <v-textarea
        v-if="!isRecording"
        v-model="newMessage"
        label="Message"
        outlined
        full-width
        no-resize
        rows="2"
        hide-details
        @keyup.enter.prevent="submit"
      />
      <v-card v-else width="100%" class="d-flex align-center justify-center">
        {{ recordingTime.toFixed(1) }}
      </v-card>
      <div class="d-flex flex-column">
        <v-btn dark small color="primary" type="submit" class="ml-2 mb-2">
          <v-icon dark>mdi-send</v-icon>
        </v-btn>
        <v-btn
          dark
          small
          :color="isRecording ? 'red' : 'primary'"
          type="submit"
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
// import vueDebounce, { PluginConfig, debounce } from 'vue-debounce'
import { debounce } from "vue-debounce";

export default {
  name: "ChatForm",
  props: {
    activeChat: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      newMessage: "",
      isRecording: false,
      recordingTime: 0,
      recordingInterval: null
    };
  },
  created() {
    // navigator.mediaDevices.getUserMedia({ audio: true });
  },
  watch: {
    async isRecording(val) {
      if (val) {
        navigator.mediaDevices.getUserMedia({ audio: true });
        this.recordingInterval = setInterval(() => {
          this.recording();
        }, 100);
        await this.rec();
      } else {
        clearInterval(this.recordingInterval);
        this.recordingTime = 0;
      }
    },
    recordingTime(val) {
      if (val >= 10) {
        this.stopRecording();
      }
    }
  },
  methods: {
    submit() {
      if (!this.newMessage.length) return;
      const messageData = {
        author: {
          id: this.$user.userId,
          name: this.$user.firstName || this.$user.email,
          avatar:
            "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
        },
        status: "online",
        date: "22.02.2022",
        message: this.newMessage
      };
      this.$socket.emit("messageToServer", {
        target: this.activeChat,
        messageData
      });
      this.newMessage = "";
    },
    startRecording() {
      // console.log("startRecording");
      this.isRecording = true;
      debounce(() => {
        this.isRecording = false;
      }, "100ms");
    },
    stopRecording() {
      // console.log("stopRecording");
      this.isRecording = false;
    },
    recording() {
      this.recordingTime = this.recordingTime + 0.1;
    },
    async rec() {
      return await new Promise(resolve => {
        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
          const mediaRecorder = new MediaRecorder(stream);
          const audioChunks = [];

          mediaRecorder.addEventListener("dataavailable", event => {
            audioChunks.push(event.data);
          });

          const start = () => {
            mediaRecorder.start();
          };

          const stop = () => {
            return new Promise(resolve => {
              mediaRecorder.addEventListener("stop", () => {
                const audioBlob = new Blob(audioChunks);
                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);
                const play = () => {
                  audio.play();
                };

                resolve({ audioBlob, audioUrl, play });
              });

              mediaRecorder.stop();
            });
          };

          resolve({ start, stop });
        });
      });
    }
  }
};
</script>
