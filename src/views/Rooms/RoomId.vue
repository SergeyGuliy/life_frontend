<template>
  <div class="RoomId">
    RoomId {{ $route.params.id }}
    <br />
    <pre>{{ roomData }}</pre>
  </div>
</template>

<script>
import { api } from "../../assets/helpers/api";

export default {
  name: "RoomId",
  components: {},
  data() {
    return {
      roomData: null
    };
  },
  async created() {
    console.log("created");
    this.roomData = {
      ...(await api.rooms.getById(this.$route.params.id)).data
    };
  },
  // eslint-disable-next-line no-unused-vars
  async beforeRouteLeave(to, from, next) {
    console.log("beforeRouteLeave");

    await this.$openModal("Promt", {
      title: "Are you shure that you want to leave room?",
      submit: "leave",
      cancel: "cancel"
    })
      .then(async () => {
        await this.$store.dispatch("user/leaveRoom");
        next();
      })
      .catch(e => {
        console.log(e);
      });
  }
};
</script>

<style lang="scss">
.RoomId {
}
</style>
