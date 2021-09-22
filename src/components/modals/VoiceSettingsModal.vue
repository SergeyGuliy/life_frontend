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
            :chatSettings.sync="getActiveChat"
            :type="data.chatType"
          />
        </v-card-text>
        <v-card-actions class="py-4 px-6">
          <v-spacer></v-spacer>
          <v-btn color="danger" @click="close()">
            {{ $t("buttons.cancel") }}
          </v-btn>
          <v-btn color="primary" @click="updateUserSettings">
            {{ $t("buttons.save") }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import modal from "../../mixins/modal";
import { SOUNDS } from "../../utils/enums";
import { cloneDeep } from "lodash";
import { $currentUserActions } from "../../composable/$currentUserActions";

export default {
  name: "VoiceSettingsModal",
  mixins: [modal],
  setup() {
    return $currentUserActions();
  },
  components: {
    VoiceSettings: () => import("../components/Cabinet/VoiceSettings")
  },
  data() {
    return {
      SOUNDS,
      chatSettings: null
    };
  },
  computed: {
    getActiveChat: {
      get() {
        return this.chatSettings[this.data.chatType];
      },
      set(val) {
        this.$set(this.chatSettings, this.data.chatType, cloneDeep(val));
      }
    }
  },
  created() {
    this.$set(this, "chatSettings", cloneDeep(this.data.chatSettings));
  },
  methods: {
    updateUserSettings() {
      this.updateUserSettings({ chatSettings: this.chatSettings }).then(() =>
        this.close()
      );
    }
  }
};
</script>
