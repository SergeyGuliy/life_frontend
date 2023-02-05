<template>
  <div>
    {{ component }}
    <component v-if="component" :is="component" />
  </div>
</template>

<script>
import { useModal } from "../../composable/useModal";

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
    const { openModal, component } = useModal();

    return { component, openModal };
  },

  computed: {
    async getComponent() {
      return this.component;
    },
  },
};
</script>

<style scoped></style>
