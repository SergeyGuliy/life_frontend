import debounce from "debounce";
import { onMounted, ref, watch } from "vue";

export function useRecording() {
  const isRecordingAvailable = ref(false);
  const recorder = ref(null);
  const audio = ref(null);
  const isRecording = ref(false);
  const recordingTime = ref(0);
  const recordingInterval = ref(null);
  const maxAudioLength = ref(100);
  const audioChunks = ref([]);

  onMounted(() => {
    navigator.getUserMedia(
      { audio: true },
      () => (isRecordingAvailable.value = true),
      () => (isRecordingAvailable.value = false)
    );
  });

  watch(isRecording, async (val) => {
    if (val) {
      audio.value = null;
      startRecordingInterval();
      recorder.value = await rec();
      recorder.value.start();
    } else {
      clearInterval(recordingInterval.value);
      recordingTime.value = 0;
      audio.value = await recorder.value.stop();
    }
  });
  watch(recordingTime, (val) => {
    if (val >= maxAudioLength.value) {
      stopRecording();
    }
  });

  function deleteVoice() {
    audio.value = null;
    audioChunks.value = [];
  }

  function startRecording() {
    isRecording.value = true;
    debounce(() => {
      isRecording.value = false;
    }, "100ms");
  }

  function stopRecording() {
    isRecording.value = false;
  }

  function startRecordingInterval() {
    recordingInterval.value = setInterval(() => {
      recordingTime.value = recordingTime.value + 0.1;
    }, 100);
  }

  async function rec() {
    // eslint-disable-next-line no-async-promise-executor
    return await new Promise(async (resolve) => {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const mediaRecorder = new MediaRecorder(stream);
      audioChunks.value = [];

      mediaRecorder.addEventListener("dataavailable", (event) => {
        audioChunks.value.push(event.data);
      });

      const start = () => mediaRecorder.start();

      const stop = () =>
        new Promise((resolve) => {
          mediaRecorder.addEventListener("stop", () => {
            const audioBlob = new Blob(audioChunks.value);
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

  return {
    isRecording,
    startRecording,
    stopRecording,
    isRecordingAvailable,
    deleteVoice,
    audio,
    recordingTime,
  };
}
