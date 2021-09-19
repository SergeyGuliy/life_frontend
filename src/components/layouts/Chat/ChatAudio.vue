<template>
  <v-card
    class="ChatAudio"
    style="text-align: center; flex: 1 1 auto"
    :flat="flat == undefined || flat == false ? false : true"
  >
    <v-card-text class="pa-0" v-if="loaded">
      <v-row class="align-center px-2 py-1">
        <v-col cols="2" class="pa-0 ">
          <v-btn
            outlined
            icon
            class=""
            :color="color"
            @click.native="playing ? pause() : play()"
            :disabled="!loaded"
          >
            <v-icon v-if="!playing || paused">mdi-play</v-icon>
            <v-icon v-else>mdi-pause</v-icon>
          </v-btn>
        </v-col>
        <v-col class="pa-0">
          <v-progress-linear
            v-model="percentage"
            class="my-2"
            height="5"
            style="margin-top: 15px; margin-bottom: 15px;"
            @click.native="setPosition()"
            :disabled="!loaded"
          />
          <p class="mb-0">{{ currentTime }} / {{ duration }}</p>
        </v-col>
        <v-col cols="2" class="pa-0" v-if="showVoiceControls">
          <v-slider
            class="sound-volume"
            height="50px"
            v-model="playerVolume"
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

      <!--      <v-btn-->
      <!--        outlined-->
      <!--        icon-->
      <!--        class="ma-2 mb-0"-->
      <!--        :color="color"-->
      <!--        @click.native="stop()"-->
      <!--        :disabled="!loaded"-->
      <!--      >-->
      <!--        <v-icon>mdi-stop</v-icon>-->
      <!--      </v-btn>-->
      <!--      <v-btn-->
      <!--        outlined-->
      <!--        icon-->
      <!--        class="ma-2 mb-0"-->
      <!--        :color="color"-->
      <!--        @click.native="mute()"-->
      <!--        :disabled="!loaded"-->
      <!--      >-->
      <!--        <v-icon v-if="!isMuted">mdi-volume-high</v-icon>-->
      <!--        <v-icon v-else>mdi-volume-mute</v-icon>-->
      <!--      </v-btn>-->
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
<script>
import getBlobDuration from "get-blob-duration";

const formatTime = second =>
  new Date(second * 1000).toISOString().substr(11, 8);
export default {
  name: "ChatAudio",
  props: {
    flat: {
      type: Boolean,
      default: true
    },
    file: {
      type: String,
      default: null
    },
    showVoiceControls: {
      type: Boolean,
      default: () => true
    },
    autoPlay: {
      type: Boolean,
      default: () => true
    },
    ended: {
      type: Function,
      default: () => {}
    },
    canPlay: {
      type: Function,
      default: () => {}
    },
    color: {
      type: String,
      default: null
    }
  },
  computed: {
    duration: function() {
      // console.log(this.totalDuration);
      return this.audio ? formatTime(this.totalDuration) : "";
    }
  },
  data() {
    return {
      firstPlay: true,
      isMuted: false,
      loaded: false,
      playing: false,
      paused: false,
      percentage: 0,
      currentTime: "00:00:00",
      audio: undefined,
      totalDuration: 0,
      playerVolume: 0.5
    };
  },
  methods: {
    setPosition() {
      this.audio.currentTime = parseInt(
        (this.audio.duration / 100) * this.percentage
      );
    },
    stop() {
      this.audio.pause();
      this.paused = true;
      this.playing = false;
      this.audio.currentTime = 0;
    },
    play() {
      if (this.playing) return;
      this.audio.play().then(() => (this.playing = true));
      this.paused = false;
    },
    pause() {
      this.paused = !this.paused;
      this.paused ? this.audio.pause() : this.audio.play();
    },
    mute() {
      this.isMuted = !this.isMuted;
      this.audio.muted = this.isMuted;
    },
    async _handleLoaded() {
      this.totalDuration = parseInt(await getBlobDuration(this.file));
      this.audio.currentTime = 0;
      this.loaded = true;
    },
    _handlePlayingUI: function() {
      this.audio.volume = this.playerVolume;
      this.percentage = (this.audio.currentTime / this.audio.duration) * 100;
      this.currentTime = formatTime(this.audio.currentTime);
      // this.playing = true;
    },
    _handlePlayPause: function(e) {
      if (e.type === "play" && this.firstPlay) {
        this.audio.currentTime = 0;
        if (this.firstPlay) {
          this.firstPlay = false;
        }
      }
      if (
        e.type === "pause" &&
        this.paused === false &&
        this.playing === false
      ) {
        this.currentTime = "00:00:00";
      }
    },
    _handleEnded() {
      this.paused = this.playing = false;
    }
  },
  async mounted() {
    this.audio = this.$refs.player;
    this.audio.addEventListener("timeupdate", this._handlePlayingUI);
    this.audio.addEventListener("loadeddata", this._handleLoaded);
    this.audio.addEventListener("pause", this._handlePlayPause);
    this.audio.addEventListener("play", this._handlePlayPause);
    this.audio.addEventListener("ended", this._handleEnded);
  },
  beforeUnmount() {
    this.audio.removeEventListener("timeupdate", this._handlePlayingUI);
    this.audio.removeEventListener("loadeddata", this._handleLoaded);
    this.audio.removeEventListener("pause", this._handlePlayPause);
    this.audio.removeEventListener("play", this._handlePlayPause);
    this.audio.removeEventListener("ended", this._handleEnded);
  }
};
</script>

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
