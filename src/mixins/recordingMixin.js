import { debounce } from "vue-debounce";

export default {
  data() {
    return {
      isRecordingAvaliable: false,
      recorder: null,
      audio: null,
      isRecording: false,
      recordingTime: 0,
      recordingInterval: null,
      maxAudioLength: 100,
      audioChunks: []
    };
  },
  watch: {
    async isRecording(val) {
      if (val) {
        this.audio = null;
        this.startRecordingInterval();
        this.recorder = await this.rec();
        this.recorder.start();
      } else {
        clearInterval(this.recordingInterval);
        this.recordingTime = 0;
        this.audio = await this.recorder.stop();
      }
    },
    recordingTime(val) {
      if (val >= this.maxAudioLength) {
        this.stopRecording();
      }
    }
  },
  async created() {
    navigator.getUserMedia(
      {
        audio: true
      },
      () => {
        this.isRecordingAvaliable = true;
      },
      () => {
        this.isRecordingAvaliable = false;
      }
    );
  },
  methods: {
    deleteVoice() {
      this.audio = null;
      this.audioChunks = [];
    },
    startRecording() {
      this.isRecording = true;
      debounce(() => {
        this.isRecording = false;
      }, "100ms");
    },
    stopRecording() {
      this.isRecording = false;
    },
    startRecordingInterval() {
      this.recordingInterval = setInterval(() => {
        this.recordingTime = this.recordingTime + 0.1;
      }, 100);
    },
    async rec() {
      // eslint-disable-next-line no-async-promise-executor
      return await new Promise(async resolve => {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true
        });
        const mediaRecorder = new MediaRecorder(stream);
        this.audioChunks = [];

        mediaRecorder.addEventListener("dataavailable", event => {
          this.audioChunks.push(event.data);
        });

        const start = () => mediaRecorder.start();

        const stop = () =>
          new Promise(resolve => {
            mediaRecorder.addEventListener("stop", () => {
              const audioBlob = new Blob(this.audioChunks);
              const audioUrl = URL.createObjectURL(audioBlob);
              const audio = new Audio(audioUrl);
              const play = () => audio.play();
              resolve({ audioBlob, audioUrl, play });
            });

            mediaRecorder.stop();
          });

        resolve({ start, stop });
      });
    }
  }
};
