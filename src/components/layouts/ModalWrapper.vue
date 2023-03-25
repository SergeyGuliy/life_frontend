<template>
  <component v-if="component" :is="component" />
</template>

<script>
import { useModal } from "@composable";

import ChangePassword from "../modals/ChangePassword.vue";
import CreateRoom from "../modals/CreateRoom.vue";
import EnterPassword from "../modals/EnterPassword.vue";
import Promt from "../modals/Promt.vue";
import VoiceSettingsModal from "../modals/VoiceSettingsModal.vue";

export default {
  name: "modalWrapper",

  components: {
    ChangePassword,
    CreateRoom,
    EnterPassword,
    Promt,
    VoiceSettingsModal,
  },

  setup() {
    const { component } = useModal();
    return { component };
  },
};
</script>

<style scoped></style>
