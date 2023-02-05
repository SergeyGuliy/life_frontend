<template>
  <div style="width: 100%">
    <Room v-show="!$gameId" />
    <Games v-if="$gameId" />
  </div>
</template>

<script>
// import roomSetup from "@/mixins/roomSetup";

import { defineAsyncComponent } from "vue";
import {useModal} from "../../composable/useModal";

export default {
  name: "RoomId",

  // mixins: [roomSetup],

  components: {
    Room: defineAsyncComponent(() =>
      import("@components/elements/Rooms/Room.vue")
    ),
    Games: defineAsyncComponent(() =>
      import("@components/elements/Games/Game.vue")
    ),
  },

  setup() {
    const {openModal} =useModal()
    return {openModal}
  },

  async beforeRouteLeave(to, from, next) {
    if (!this.$user || +this.$user?.roomJoinedId !== this.$roomId) {
      next();
    } else {
      await this.openModal("Promt", {
        title: this.$t("modals.wantLeaveRoom"),
        submit: this.$t("buttons.leave"),
        cancel: this.$t("buttons.cancel"),
      })
        .then(async () => {
          await this.$store.dispatch("user/leaveRoomAction");
          next();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  },
};
</script>
