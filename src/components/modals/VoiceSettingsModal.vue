<template>
  <v-dialog persistent :model-value="!!component" width="500">
    <v-card>
      <v-form>
        <v-card-title class="pb-6">
          {{ $t("modals.voiceTitle") }}
        </v-card-title>
        <v-card-text>
          <VoiceSettings
            v-if="chatSettings"
            v-model:chatSettings="getActiveChat"
            :type="data.chatType"
          />
        </v-card-text>
        <v-card-actions class="py-4 px-6">
          <v-spacer></v-spacer>
          <v-btn color="danger" @click="closeModal()">
            {{ $t("buttons.cancel") }}
          </v-btn>
          <v-btn color="primary" @click="updateUserSettingsHandler">
            {{ $t("buttons.save") }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { cloneDeep } from "lodash";

import { useUserSettings } from "../../composable/useUserSettings";
import { useModal } from "../../composable/useModal";

import { SOUNDS_WITH_FILES } from "@utils/enums";

export default {
  name: "VoiceSettingsModal",

  setup() {
    const { data, component, closeModal } = useModal();
    const { updateUserSettings } = useUserSettings();

    return { data, component, closeModal, updateUserSettings };
  },

  components: {
    VoiceSettings: defineAsyncComponent(() =>
      import("../elements/Cabinet/VoiceSettings.vue")
    ),
  },
  data() {
    return {
      SOUNDS_WITH_FILES,
      chatSettings: null,
    };
  },
  computed: {
    getActiveChat: {
      get() {
        return this.chatSettings[this.data.chatType];
      },
      set(val) {
        this.chatSettings[this.data.chatType] = cloneDeep(val);
      },
    },
  },
  created() {
    this.chatSettings = cloneDeep(this.data.chatSettings);
  },

  methods: {
    updateUserSettingsHandler() {
      this.updateUserSettings({ chatSettings: this.chatSettings }).then(
        this.closeModal
      );
    },
  },
};
</script>
