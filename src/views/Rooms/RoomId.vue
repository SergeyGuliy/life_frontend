<template>
  <div class="RoomId" v-if="roomData">
    <v-card class="mx-auto" max-width="400">
      <RoomInfo :roomData="roomData" />
      <v-card-actions>
        <v-btn color="orange" text>
          Block room
        </v-btn>
        <v-btn color="orange" text>
          Delete room
        </v-btn>
      </v-card-actions>
    </v-card>
    <UsersList :users="usersInRoom" :showUserRoomInfo="true"></UsersList>
    <pre>{{ roomData }}</pre>
  </div>
</template>

<script>
import { api } from "../../assets/helpers/api";

export default {
  name: "RoomId",
  components: {
    RoomInfo: () => import("../../components/Rooms/RoomInfo"),
    UsersList: () => import("../../components/Users/UsersList")
  },
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
  },
  computed: {
    usersInRoom() {
      return [...this.roomData.usersInRoom].sort((a, b) => {
        return (
          (a.roomJoinedId === a.createdRoomId) +
          (b.roomJoinedId === b.createdRoomId)
        );
      });
    }
  }
};
</script>

<style lang="scss">
.RoomId {
}
</style>
