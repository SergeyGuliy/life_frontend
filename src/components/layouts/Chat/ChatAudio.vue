<script setup>
import getBlobDuration from "get-blob-duration";
import { computed, onMounted, onUnmounted, reactive, ref } from "vue";

const formatTime = (second) =>
  new Date(second * 1000).toISOString().substr(11, 8);

const props = defineProps({
  flat: { type: Boolean, default: true },
  file: { type: String, default: null },
  showVoiceControls: { type: Boolean, default: () => true },
  autoPlay: { type: Boolean, default: () => true },
  ended: { type: Function, default: () => {} },
  canPlay: { type: Function, default: () => {} },
  color: { type: String, default: null },
});

const player = ref(null);

const model = reactive({
  percentage: 0,
  playerVolume: 0.5,
});

const settings = reactive({
  loaded: false,
  firstPlay: true,
  isMuted: false,
  playing: false,
  paused: false,
  totalDuration: 0,
  currentTime: "00:00:00",
});

const duration = computed(() =>
  player.value ? formatTime(settings.totalDuration) : ""
);

const setPosition = () =>
  (player.value.currentTime = parseInt(
    (player.value.duration / 100) * model.percentage
  ));

function stop() {
  player.value.pause();
  settings.paused = true;
  settings.playing = false;
  player.value.currentTime = 0;
}
function play() {
  if (settings.playing) return;
  player.value.play().then(() => (settings.playing = true));
  settings.paused = false;
}
function pause() {
  settings.paused = !settings.paused;
  settings.paused ? player.value.pause() : player.value.play();
}
function mute() {
  settings.isMuted = !settings.isMuted;
  player.value.muted = settings.isMuted;
}
async function _handleLoaded() {
  settings.totalDuration = parseInt(await getBlobDuration(props.file));
  player.value.currentTime = 0;
  settings.loaded = true;
}
function _handlePlayingUI() {
  player.value.volume = model.playerVolume;
  model.percentage = (player.value.currentTime / player.value.duration) * 100;
  settings.currentTime = formatTime(player.value.currentTime);
  // settings.playing = true;
}
function _handlePlayPause(e) {
  if (e.type === "play" && settings.firstPlay) {
    player.value.currentTime = 0;
    if (settings.firstPlay) settings.firstPlay = false;
  }
  if (e.type === "pause" && !settings.paused && !settings.playing) {
    settings.currentTime = "00:00:00";
  }
}
const _handleEnded = () => (settings.paused = settings.playing = false);

onMounted(() => {
  player.value.addEventListener("timeupdate", _handlePlayingUI);
  player.value.addEventListener("loadeddata", _handleLoaded);
  player.value.addEventListener("pause", _handlePlayPause);
  player.value.addEventListener("play", _handlePlayPause);
  player.value.addEventListener("ended", _handleEnded);
});
onUnmounted(() => {
  player.value.removeEventListener("timeupdate", _handlePlayingUI);
  player.value.removeEventListener("loadeddata", _handleLoaded);
  player.value.removeEventListener("pause", _handlePlayPause);
  player.value.removeEventListener("play", _handlePlayPause);
  player.value.removeEventListener("ended", _handleEnded);
});
</script>

<template>
  <v-card
    class="ChatAudio"
    style="text-align: center; flex: 1 1 auto"
    :flat="flat"
  >
    <v-card-text class="pa-0" v-if="settings.loaded">
      <v-row class="align-center px-2 py-1">
        <v-col cols="2" class="pa-0">
          <v-btn
            outlined
            icon
            class=""
            :color="color"
            @click="settings.playing ? pause() : play()"
            :disabled="!settings.loaded"
          >
            <v-icon v-if="!settings.playing || settings.paused">
              mdi-play
            </v-icon>
            <v-icon v-else>mdi-pause</v-icon>
          </v-btn>
        </v-col>
        <v-col class="pa-0">
          <v-progress-linear
            v-model="model.percentage"
            class="my-2"
            height="5"
            style="margin-top: 15px; margin-bottom: 15px"
            @click="setPosition()"
            :disabled="!settings.loaded"
          />
          <p class="mb-0">{{ settings.currentTime }} / {{ duration }}</p>
        </v-col>
        <v-col cols="2" class="pa-0" v-if="showVoiceControls">
          <v-slider
            class="sound-volume"
            height="50px"
            v-model="model.playerVolume"
            prepend-icon="mdi-volume-high"
            hide-details
            vertical
            max="1"
            step="0.01"
            min="0"
          ></v-slider>
        </v-col>
        <slot name="prepend"></slot>
      </v-row>
    </v-card-text>

    <audio
      id="player"
      ref="player"
      v-on:ended="ended"
      v-on:canplay="canPlay"
      :src="file"
    ></audio>
  </v-card>
</template>

<style lang="scss">
.ChatAudio {
  .sound-volume {
    min-height: 100%;
    .v-input__control {
      .v-slider {
        flex: 1 1 auto;
        margin: 0;
        min-height: 35px;
      }
    }
  }
}
</style>
