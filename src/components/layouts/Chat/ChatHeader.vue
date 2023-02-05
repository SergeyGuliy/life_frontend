<template>
  <v-toolbar dark color="primary darken-1">
    <v-toolbar-title>{{ getChatName }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn @click="openChatSettingsModal" color="blue darken-2" class="mr-2">
      <v-icon> mdi-message-settings-variant </v-icon>
    </v-btn>
    <v-btn
      v-if="showClose"
      @click="$emit('input', !value)"
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
const { openModal } = useModal();

export default {
  name: "ChatHeader",
  props: {
    value: {
      required: false,
      type: Boolean,
    },
    showClose: {
      default: () => true,
      type: Boolean,
    },
    activeChat: {
      required: false,
      type: String,
    },
  },
  computed: {
    getChatName() {
      if (this.activeChat) {
        return this.$filters.getChatTabName(this.activeChat);
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
      let { chatSettings } = new ProfileSettingsParser(this.$user);
      await openModal("VoiceSettingsModal", {
        chatType,
        chatSettings,
      }).catch((e) => {
        console.log(e);
      });
    },
  },
};
</script>
