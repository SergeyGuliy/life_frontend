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
      <UsersList
        :users="usersInRoom"
        :showUserRoomInfo="true"
        :sortType="'adminFirst'"
      >
        <template #actions="{userData}">
          <v-btn
            v-if="isRoomAdmin && userData.userId !== $user.userId"
            @click="kickUserFromRoom(userData.userId)"
          >
            {{ $t("buttons.kickUser") }}
          </v-btn>
          <v-btn
            v-if="isRoomAdmin && userData.userId !== $user.userId"
            @click="setNewRoomAdmin(userData.userId)"
          >
            {{ $t("buttons.setAdmin") }}
          </v-btn>
          <v-btn
            v-if="userData.userId !== $user.userId"
            @click="writeMessageToUser(userData.userId)"
          >
            {{ $t("buttons.writeMessage") }}
          </v-btn>
          <v-btn
            v-if="userData.userId !== $user.userId"
            @click="addUserToFriendsList(userData.userId)"
          >
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
    RoomInfo: () => import("../../components/elements/Rooms/RoomInfo"),
    UsersList: () => import("../../components/elements/Users/UsersList")
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
    this.$socket.client.off("userKickedFromRoom", this.userKickedFromRoom);
  },

  async beforeRouteLeave(to, from, next) {
    if (!this.$user || +this.$user?.roomJoinedId !== +this.$route.params.id) {
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
    isRoomAdmin() {
      return +this.$user.roomCreatedId === +this.$route.params.id;
    },

    usersInRoom() {
      return this.roomData.usersInRoom;
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
      this.$socket.client.on(
        "updateUsersListInRoom",
        this.updateUserListInRoom
      );
      this.$socket.client.on("updateRoomAdmin", this.updateRoomAdmin);
      this.$socket.client.on("userKickedFromRoom", this.userKickedFromRoom);
    },

    async userKickedFromRoom(kickUserId) {
      let indexKickedUserId = this.roomData.usersInRoom.findIndex(
        user => +user.userId === +kickUserId
      );
      const isKickedUserMe = +this.$user.userId === +kickUserId;
      this.$delete(this.roomData.usersInRoom, indexKickedUserId);

      if (isKickedUserMe) {
        this.$store.commit("user/leaveRoom");
        await this.$router.push({ name: "Home" });
      }
    },

    updateUserListInRoom(usersInRoom) {
      this.roomData.usersInRoom = usersInRoom;
    },
    updateRoomAdmin(newAdmin) {
      let indexOldAdmin = this.roomData.usersInRoom.findIndex(
        user => typeof user.roomCreatedId === "number"
      );
      this.$set(
        this.roomData.usersInRoom[indexOldAdmin],
        "roomCreatedId",
        null
      );

      let indexNewAdmin = this.roomData.usersInRoom.findIndex(
        user => user.userId === newAdmin.userId
      );
      this.$set(
        this.roomData.usersInRoom[indexNewAdmin],
        "roomCreatedId",
        +this.$route.params.id
      );

      if (newAdmin.userId === this.$user.userId) {
        this.$store.commit("user/setRoomId", +this.$route.params.id);
      } else {
        this.$store.commit("user/setRoomId", null);
      }
    },
    async kickUserFromRoom(userId) {
      await api.rooms.kickUserFromRoom(this.$route.params.id, userId);
    },
    async setNewRoomAdmin(userId) {
      await api.rooms.setNewRoomAdmin(this.$route.params.id, userId);
    }
  }
};
</script>
