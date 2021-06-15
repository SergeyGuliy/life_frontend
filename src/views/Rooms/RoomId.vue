<template>
  <div class="RoomId" v-if="roomData">
    <v-row>
      <v-col cols="6">
        <v-card>
          <RoomInfo
            :roomData="{
              ...roomData,
              usersInRoomLength: usersInRoom.length
            }"
          >
            <template #actions>
              <v-btn>
                {{ $t("btns.blockRoom") }}
              </v-btn>
              <v-btn>
                {{ $t("btns.deleteRoom") }}
              </v-btn>
            </template>
          </RoomInfo>
        </v-card>
      </v-col>
      <v-col cols="6">
        <UsersList :users="usersInRoom" :showUserRoomInfo="true">
          <template #actions="{userData}">
            <v-btn
              v-if="userData.roomJoinedId === userData.createdRoomId"
              @click="kickUserFromRoom(userData.userId)"
            >
              {{ $t("btns.kickUser") }}
            </v-btn>
            <v-btn
              v-if="userData.userId !== $user.userId"
              @click="$writeMessageToUser(userData.userId)"
            >
              {{ $t("btns.writeMessage") }}
            </v-btn>
            <v-btn
              v-if="userData.roomJoinedId === userData.createdRoomId"
              @click="setNewAdminInRoom(userData.userId)"
            >
              {{ $t("btns.setAdmin") }}
            </v-btn>
            <v-btn @click="$addUserToFriendsList(userData.userId)">
              {{ $t("btns.addToFriend") }}
            </v-btn>
          </template>
        </UsersList>
      </v-col>
    </v-row>
    <pre>{{ roomData }}</pre>
  </div>
</template>

<script>
import { api } from "../../assets/helpers/api";

export default {
  name: "RoomId",
  components: {
    RoomInfo: () => import("../../components/logic/Rooms/RoomInfo"),
    UsersList: () => import("../../components/logic/Users/UsersList")
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
    if (!this.$user) {
      next();
    } else {
      await this.$openModal("Promt", {
        title: this.$t("modals.wantLeaveRoom"),
        submit: this.$t("btns.leave"),
        cancel: this.$t("btns.cancel")
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
    kickUserFromRoom(userId) {
      console.log(userId);
    },
    setNewAdminInRoom(userId) {
      console.log(userId);
    }
  }
};
</script>

<style lang="scss">
.RoomId {
}
</style>
