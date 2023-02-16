<template>
  <v-toolbar dark color="primary darken-1">
    <v-toolbar-title>{{ getChatName }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn @click="openChatSettingsModal" color="blue darken-2" class="mr-2">
      <v-icon> mdi-message-settings-variant </v-icon>
    </v-btn>
    <v-btn
      v-if="showClose"
      @click="$emit('update:modelValue', !value)"
      color="blue darken-2"
    >
      <v-icon> mdi-close </v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import { MESSAGE_RECEIVER_TYPES, MESSAGES_TYPES_MAP } from "@enums";
const { GLOBAL, ROOM, PRIVATE } = MESSAGE_RECEIVER_TYPES;
import { ProfileSettingsParser } from "@utils/parsers";

import { useModal } from "@composable/useModal";
import { useUsers } from "../../../composable/useUsers";
import { getChatTabName } from "../../../plugins/modules/globalFilters/filters/getChatTabName";

export default {
  name: "ChatHeader",
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      required: false,
      type: Boolean,
    },
    showClose: {
      default: () => true,
      type: Boolean,
    },
    activeChat: {
      required: false,
      type: [String, Number],
    },
  },
  setup() {
    const { myUser } = useUsers();
    const { openModal } = useModal();

    return { myUser, openModal, getChatTabName };
  },
  computed: {
    getChatName() {
      if (this.activeChat) {
        return this.getChatTabName(this.activeChat);
      } else {
        return "Chat";
      }
    },
  },

  methods: {
    getChatType(chatKey) {
      if ([GLOBAL, ROOM].includes(chatKey)) {
        return MESSAGES_TYPES_MAP[chatKey];
      } else {
        return MESSAGES_TYPES_MAP[PRIVATE];
      }
    },
    async openChatSettingsModal() {
      const chatType = this.getChatType(this.activeChat);
      let { chatSettings } = new ProfileSettingsParser(this.myUser);
      await this.openModal("VoiceSettingsModal", {
        chatType,
        chatSettings,
      }).catch((e) => {
        console.log(e);
      });
    },
  },
};
</script>
