<template>
  <v-toolbar dark color="primary darken-1">
    <v-toolbar-title>{{ getChatName }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn @click="openChatSettingsModal" color="blue darken-2" class="mr-2">
      <v-icon>
        mdi-message-settings-variant
      </v-icon>
    </v-btn>
    <v-btn
      v-if="showClose"
      @click="$emit('input', !value)"
      color="blue darken-2"
    >
      <v-icon>
        mdi-close
      </v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import { MESSAGE_RECEIVER_TYPES } from "../../../assets/helpers/enums";
const { GLOBAL, ROOM, PRIVATE } = MESSAGE_RECEIVER_TYPES;
export default {
  name: "ChatHeader",
  props: {
    value: {
      required: false,
      type: Boolean
    },
    showClose: {
      default: () => true,
      type: Boolean
    },
    activeChat: {
      required: false,
      type: String
    }
  },
  computed: {
    getChatName() {
      if (this.activeChat) {
        return this.chatTabName(this.activeChat);
      } else {
        return "Chat";
      }
    }
  },
  methods: {
    chatTabName(chatTab) {
      if (this.$chats[chatTab].key === GLOBAL) {
        return this.$t(`enums.${GLOBAL}`);
      } else if (this.$chats[chatTab].key === ROOM) {
        return this.$t(`enums.${ROOM}`);
      } else if (this.$chats[chatTab].key === PRIVATE) {
        return this.$getUserName(this.$chats[chatTab].userData);
      }
    },
    async openChatSettingsModal() {
      await this.$openModal("VoiceSettingsModal", {
        title: this.$t("modals.wantLeaveRoom"),
        submit: this.$t("buttons.leave"),
        cancel: this.$t("buttons.cancel")
      })
        .then(async () => {})
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>
