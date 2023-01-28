<template>
  <div style="width: 100%">
    <Room v-show="!$gameId" />
    <Games v-if="$gameId" />
  </div>
</template>

<script>
// import roomSetup from "@/mixins/roomSetup";

export default {
  name: "RoomId",

  // mixins: [roomSetup],

  components: {
    Room: () => import("@components/elements/Rooms/Room.vue"),
    Games: () => import("@components/elements/Games/Game.vue"),
  },

  async beforeRouteLeave(to, from, next) {
    if (!this.$user || +this.$user?.roomJoinedId !== this.$roomId) {
      next();
    } else {
      await this.$openModal("Promt", {
        title: this.$t("modals.wantLeaveRoom"),
        submit: this.$t("buttons.leave"),
        cancel: this.$t("buttons.cancel"),
      })
        .then(async () => {
          await this.$store.dispatch("user/leaveRoom");
          next();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  },
};
</script>
