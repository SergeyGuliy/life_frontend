<template>
  <v-dialog
    persistent
    :value="!!component"
    width="500"
    @click:outside.prevent.stop="close()"
  >
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
          <v-btn color="danger" @click="close()">
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
import modal from "@mixins/modal";
// import { SOUNDS_WITH_FILES } from "@enums";
import { cloneDeep } from "lodash";
import { $currentUserActions } from "@composable/$currentUserActions";
import { defineAsyncComponent } from "vue";
const { updateUserSettings } = $currentUserActions();

export default {
  name: "VoiceSettingsModal",
  mixins: [modal],

  components: {
    VoiceSettings: defineAsyncComponent(() =>
      import("../elements/Cabinet/VoiceSettings.vue")
    ),
  },
  data() {
    return {
      // SOUNDS_WITH_FILES,
      chatSettings: null,
    };
  },
  computed: {
    getActiveChat: {
      get() {
        return this.chatSettings[this.data.chatType];
      },
      set(val) {
        this.$set(this.chatSettings, this.data.chatType, cloneDeep(val));
      },
    },
  },
  created() {
    this.$set(this, "chatSettings", cloneDeep(this.data.chatSettings));
  },
  methods: {
    updateUserSettingsHandler() {
      updateUserSettings({ chatSettings: this.chatSettings }).then(() =>
        this.close()
      );
    },
  },
};
</script>
