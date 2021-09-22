<template>
  <Grid v-if="roomData">
    <template #leftCol>
      <RoomInfo
        :roomData="{
          ...roomData,
          usersInRoomLength: usersInRoom.length
        }"
      >
        <template #actions>
          <v-btn>
            {{ $t("buttons.blockRoom") }}
          </v-btn>
          <v-btn>
            {{ $t("buttons.deleteRoom") }}
          </v-btn>
        </template>
      </RoomInfo>
    </template>
    <template #rightCol>
      <UsersList :users="usersInRoom" :showUserRoomInfo="true">
        <template #actions="{userData}">
          <v-btn
            v-if="userData.roomJoinedId === userData.createdRoomId"
            @click="kickUserFromRoom(userData.userId)"
          >
            {{ $t("buttons.kickUser") }}
          </v-btn>
          <v-btn
            v-if="userData.userId !== $user.userId"
            @click="writeMessageToUser(userData.userId)"
          >
            {{ $t("buttons.writeMessage") }}
          </v-btn>
          <v-btn
            v-if="userData.roomJoinedId === userData.createdRoomId"
            @click="setNewAdminInRoom(userData.userId)"
          >
            {{ $t("buttons.setAdmin") }}
          </v-btn>
          <v-btn @click="addUserToFriendsList(userData.userId)">
            {{ $t("buttons.addToFriend") }}
          </v-btn>
        </template>
      </UsersList>
    </template>
  </Grid>
</template>

<script>
import { api } from "../../utils/api";
import { $usersActions } from "../../composable/$usersActions";

export default {
  name: "RoomId",
  setup() {
    return $usersActions();
  },
  components: {
    RoomInfo: () => import("../../components/components/Rooms/RoomInfo"),
    UsersList: () => import("../../components/components/Users/UsersList")
  },
  data() {
    return {
      roomData: null
    };
  },
  async mounted() {
    this.intiComponent();
    this.$watch("$socket.connected", this.intiComponent);
  },

  beforeDestroy() {
    this.$socket.client.off("updateUserListInRoom", this.updateUserListInRoom);
    this.$socket.client.off("updateRoomAdmin", this.updateRoomAdmin);
  },

  async beforeRouteLeave(to, from, next) {
    if (!this.$user) {
      next();
    } else {
      await this.$openModal("Promt", {
        title: this.$t("modals.wantLeaveRoom"),
        submit: this.$t("buttons.leave"),
        cancel: this.$t("buttons.cancel")
      })
        .then(async () => {
          await this.$store.dispatch("user/leaveRoom");
          next();
        })
        .catch(e => {
          console.log(e);
        });
    }
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
  },
  methods: {
    async intiComponent() {
      if (!this.$socket.connected) return;

      this.roomData = {
        ...(await api.rooms.getById(this.$route.params.id)).data
      };
      this.$socket.client.emit("userConnectsRoom", {
        userId: this.$user.userId,
        roomId: this.roomData.roomId
      });
      this.$socket.client.on("updateUserListInRoom", this.updateUserListInRoom);
      this.$socket.client.on("updateRoomAdmin", this.updateRoomAdmin);
    },

    updateUserListInRoom(usersInRoom) {
      this.roomData.usersInRoom = usersInRoom;
    },
    updateRoomAdmin(newAdmin) {
      this.roomData.creator = newAdmin;
    },
    kickUserFromRoom(userId) {
      console.log(userId);
    },
    setNewAdminInRoom(userId) {
      console.log(userId);
    }
  }
};
</script>
