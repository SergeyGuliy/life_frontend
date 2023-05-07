<script setup>
import { computed, defineProps, onMounted, ref } from "vue";

import ChatAudio from "@components/layouts/Chat/ChatAudio.vue";
import { getSoundsWithFile } from "@enums";

const emit = defineEmits(["update:chatSettings"]);
const props = defineProps({
  chatSettings: { type: Object, required: true },
  type: { type: String, required: true },
});

const isOpen = ref(false);
const sounds = ref([]);

const isTurnedOn = computed({
  get: () => props.chatSettings.isTurnedOn,
  set: (val) => updateChatSettings({ isTurnedOn: val }),
});
const autoplay = computed({
  get: () => props.chatSettings.autoplay,
  set: (val) => updateChatSettings({ autoplay: val }),
});

const soundSelected = computed({
  get: () =>
    sounds.value.find((i) => i.name === props.chatSettings.soundSelected),
  set: (val) => updateChatSettings({ soundSelected: val }),
});

const updateChatSettings = (updateObj) =>
  emit("update:chatSettings", { ...props.chatSettings, ...updateObj });

function selectSound(sound) {
  soundSelected.value = sound;
  isOpen.value = false;
}

onMounted(async () => (sounds.value = await getSoundsWithFile()));
</script>

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
          <template v-slot:activator="{ props }">
            <v-list-item class="pa-0">
              <ChatAudio :showVoiceControls="false" :file="soundSelected.sound">
                <template #prepend>
                  <v-col cols="2" class="px-0">
                    <v-btn icon v-bind="props">
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
              v-for="(item, index) in sounds.filter(
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
              <!--              <v-list-item-title>{{ item.name }}</v-list-item-title>-->
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </template>
  </v-row>
</template>

<style lang="scss">
.VoiceSettings {
  width: 100%;
}
</style>
