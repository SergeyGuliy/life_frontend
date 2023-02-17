<template>
  <v-row class="VoiceSettings px-4">
    <v-col
      cols="12"
      class="py-0 d-flex align-center justify-space-between my-2"
    >
      <div class="label">
        {{
          isTurnedOn
            ? $t(`forms.labels.${type}.soundEnabling.enable`)
            : $t(`forms.labels.${type}.soundEnabling.disable`)
        }}
      </div>
      <v-switch class="mt-0" inset v-model="isTurnedOn" flat hide-details />
    </v-col>
    <template v-if="isTurnedOn">
      <v-col
        cols="12"
        class="py-0 d-flex align-center justify-space-between my-2"
      >
        <div class="label">
          {{
            autoplay
              ? $t(`forms.labels.${type}.autoplayEnabling.enable`)
              : $t(`forms.labels.${type}.autoplayEnabling.disable`)
          }}
        </div>
        <v-switch class="mt-0" inset v-model="autoplay" flat hide-details />
      </v-col>
      <v-col cols="12" class="pt-0 my-2">
        <div class="label mb-2">
          {{ $t(`forms.labels.${type}.selectMessageVoice`) }}
        </div>
        <v-menu
          :close-on-content-click="false"
          class="lang-selector"
          auto
          v-model="isOpen"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-list-item class="pa-0">
              <ChatAudio :showVoiceControls="false" :file="soundSelected.sound">
                <template #prepend>
                  <v-col cols="2" class="px-0">
                    <v-btn icon v-bind="attrs" v-on="on">
                      <v-icon>mdi-arrow-down</v-icon>
                    </v-btn>
                  </v-col>
                </template>
              </ChatAudio>
            </v-list-item>
          </template>
          <v-list class="lang-selector__list">
            <v-list-item
              link
              class="pa-0"
              v-for="(item, index) in SOUNDS_WITH_FILES.filter(
                (i) => i.name !== soundSelected.name
              )"
              :key="index"
            >
              <ChatAudio :showVoiceControls="false" :file="item.sound">
                <template #prepend>
                  <v-col cols="2" class="px-0">
                    <v-btn icon @click="selectSound(item.name)">
                      <v-icon>mdi-alarm-plus</v-icon>
                    </v-btn>
                  </v-col>
                </template>
              </ChatAudio>
              <!--                      <v-list-item-title>{{ item.name }}</v-list-item-title>-->
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </template>
  </v-row>
</template>

<script>
import { SOUNDS_WITH_FILES } from "@utils/enums";
import { defineAsyncComponent } from "vue";

export default {
  name: "VoiceSettings",
  props: {
    chatSettings: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  components: {
    ChatAudio: defineAsyncComponent(() =>
      import("../../layouts/Chat/ChatAudio")
    ),
  },
  computed: {
    isTurnedOn: {
      get() {
        return this.chatSettings.isTurnedOn;
      },
      set(val) {
        this.$emit("update:chatSettings", {
          ...this.chatSettings,
          isTurnedOn: val,
        });
      },
    },
    autoplay: {
      get() {
        return this.chatSettings.autoplay;
      },
      set(val) {
        this.$emit("update:chatSettings", {
          ...this.chatSettings,
          autoplay: val,
        });
      },
    },
    soundSelected: {
      get() {
        return this.SOUNDS_WITH_FILES.find(
          (i) => i.name === this.chatSettings.soundSelected
        );
      },
      set(val) {
        this.$emit("update:chatSettings", {
          ...this.chatSettings,
          soundSelected: val,
        });
      },
    },
  },
  data() {
    return {
      SOUNDS_WITH_FILES,
      isOpen: false,
    };
  },
  methods: {
    selectSound(sound) {
      this.soundSelected = sound;
      this.isOpen = false;
    },
  },
};
</script>

<style lang="scss">
.VoiceSettings {
  width: 100%;
}
</style>
