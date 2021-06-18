<template>
  <v-toolbar dark color="primary darken-1">
    <v-toolbar-title>Chat</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn @click="openChatSettingsModal" color="blue darken-2" class="mr-2">
      <v-icon>
        mdi-message-settings-variant
      </v-icon>
    </v-btn>
    <v-btn @click="$emit('input', !value)" color="blue darken-2">
      <v-icon>
        mdi-close
      </v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: "ChatHeader",
  props: {
    value: {
      required: true,
      type: Boolean
    }
  },
  methods: {
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
