<template>
  <component v-if="component" :is="component" />
</template>

<script>
import {useModal} from "../../composable/useModal";

import ChangePassword from "../modals/ChangePassword.vue";
import CreateRoom from "../modals/CreateRoom.vue";
import EnterPassword from "../modals/EnterPassword.vue";
import Promt from "../modals/Promt.vue";
import Test from "../modals/Test.vue";
import VoiceSettingsModal from "../modals/VoiceSettingsModal.vue";

export default {
  name: "modalWrapper",

  components: {
    ChangePassword,
    CreateRoom,
    EnterPassword,
    Promt,
    Test,
    VoiceSettingsModal,
  },


  mounted() {
    setTimeout(() => {
      this.openModal("Promt", {
        title: `You want to leave your work?`,
        submit: "Leave",
        cancel: this.$t("buttons.cancel")
      })
    }, 2000)
  },

  setup() {
    const {openModal, component} = useModal()

    return {component, openModal}
  },

  computed: {
    async getComponent() {
      return this.component
    },
  }
}
</script>

<style scoped>

</style>
