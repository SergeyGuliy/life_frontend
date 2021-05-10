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
  sockets: {
    updateUsersListInRoom(usersInRoom) {
      this.roomData.usersInRoom = usersInRoom;
    },
    updateRoomAdmin(newAdmin) {
      this.roomData.creator = newAdmin;
    }
  },
  async mounted() {
    this.roomData = {
      ...(await api.rooms.getById(this.$route.params.id)).data
    };
    this.$socket.emit("userConnectsRoom", {
      userId: this.$user.userId,
      roomId: this.roomData.roomId
    });
  },

  async beforeRouteLeave(to, from, next) {
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
