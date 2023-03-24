<script setup>
import { computed } from "vue";

import { ProfileSettingsParser } from "@utils/parsers";
import { getChatTabName } from "@plugins/modules/globalFilters/filters/getChatTabName";
import { useModal } from "@composable/useModal";
import { useUsers } from "@composable/useUsers";

import { MESSAGE_RECEIVER_TYPES, MESSAGES_TYPES_MAP } from "@enums";

const { GLOBAL, ROOM, PRIVATE } = MESSAGE_RECEIVER_TYPES;

const { myUser } = useUsers();
const { openModal } = useModal();

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: { required: false, type: Boolean },
  showClose: { default: () => true, type: Boolean },
  activeChat: { required: false, type: [String, Number] },
});

const getChatName = computed(() => {
  if (!props.activeChat) return "Chat";
  return getChatTabName(props.activeChat);
});

function getChatType(chatKey) {
  if ([GLOBAL, ROOM].includes(chatKey)) return MESSAGES_TYPES_MAP[chatKey];
  return MESSAGES_TYPES_MAP[PRIVATE];
}
function openChatSettingsModal() {
  const chatType = getChatType(props.activeChat);
  let { chatSettings } = new ProfileSettingsParser(myUser.value);
  openModal("VoiceSettingsModal", {
    chatType,
    chatSettings,
  }).catch((e) => {
    console.log(e);
  });
}
</script>

<template>
  <v-toolbar dark color="primary darken-1">
    <v-toolbar-title>{{ getChatName }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn @click="openChatSettingsModal" color="blue darken-2" class="mr-2">
      <v-icon> mdi-message-settings-variant </v-icon>
    </v-btn>
    <v-btn
      v-if="showClose"
      @click="emit('update:modelValue', !modelValue)"
      color="blue darken-2"
    >
      <v-icon> mdi-close </v-icon>
    </v-btn>
  </v-toolbar>
</template>
