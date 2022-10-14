<template>
  <Grid v-if="roomData">
    <template #leftCol>
      <RoomInfo
        :roomData="{
          ...roomData,
          usersInRoomLength: usersInRoom.length
        }"
      >
        <template #actions v-if="isRoomAdmin">
          <v-btn v-if="!roomData.isBlocked" @click="toggleLockRoom">
            {{ $t("buttons.lockRoom") }}
          </v-btn>
          <v-btn v-else-if="roomData.isBlocked" @click="toggleLockRoom">
            {{ $t("buttons.unLockRoom") }}
          </v-btn>
          <v-btn @click="deleteRoom">
            {{ $t("buttons.deleteRoom") }}
          </v-btn>
        </template>
      </RoomInfo>

      <v-btn @click="startGame" block v-if="isRoomAdmin">
        {{ $t("buttons.startGame") }}
      </v-btn>
    </template>
    <template #rightCol>
      <UsersList
        :users="usersInRoom"
        :showUserRoomInfo="true"
        :sortType="'adminFirst'"
      >
        <template #actions="{userData, isYou}">
          <template v-if="!isYou">
            <template v-if="isRoomAdmin">
              <UserButton
                :userId="userData.userId"
                :roomId="roomId"
                type="kickUserFromRoom"
              />
              <UserButton
                :userId="userData.userId"
                :roomId="roomId"
                type="setNewRoomAdmin"
              />
            </template>
            <UserButton :userId="userData.userId" type="writeMessage" />
            <UserButton :userId="userData.userId" type="addUserToFriendsList" />
          </template>
        </template>
      </UsersList>
    </template>
  </Grid>
</template>

<script>
import { api } from "@api";

import {
  rooms_userConnectsRoom,
  rooms_updateUsersListInRoom,
  rooms_updateRoomAdmin,
  rooms_userKickedFromRoom,
  rooms_updateToggleLockRoom
} from "@constants/ws/rooms.js";

export default {
  name: "RoomId",

  components: {
    RoomInfo: () => import("@components/elements/Rooms/RoomInfo"),
    UsersList: () => import("@components/elements/Users/UsersList"),
    UserButton: () => import("@components/elements/Users/UserButton")
  },
  data() {
    return {
      roomData: null,
      gameSettings: {
        data: "data"
      }
    };
  },
  async mounted() {
    this.$initSocketListener(this.intiComponent);
  },
  async beforeRouteLeave(to, from, next) {
    if (!this.$user || +this.$user?.roomJoinedId !== this.roomId) {
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
      return this.$user.roomCreatedId === this.roomId;
    },
    usersInRoom() {
      return this.roomData.usersInRoom;
    },
    roomId() {
      return +this.$route.params.id;
    }
  },
  methods: {
    startGame() {
      api.games
        .startGame(this.roomId, this.gameSettings)
        .then(({ game }) => {
          console.warn("startGame");
          console.log(game);
        })
        .catch(e => {
          console.log(e);
        });
    },
    async intiComponent() {
      api.rooms
        .getRoomById(this.roomId)
        .then(data => {
          this.roomData = data;
          this.$socket.client.emit(rooms_userConnectsRoom, {
            userId: this.$user.userId,
            roomId: this.roomData.roomId
          });
          this.$socketInit({
            [rooms_updateUsersListInRoom]: this.updateUserListInRoom,
            [rooms_updateRoomAdmin]: this.updateRoomAdmin,
            [rooms_userKickedFromRoom]: this.userKickedFromRoom,
            [rooms_updateToggleLockRoom]: this.updateToggleLockRoom
          });
        })
        .catch(() => {
          this.$store.commit("user/leaveRoom");
          this.$router.push({ name: "Home" });
        });
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

    updateToggleLockRoom(lockState) {
      this.roomData.isBlocked = lockState;
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
        this.roomId
      );

      if (newAdmin.userId === this.$user.userId) {
        this.$store.commit("user/setRoomId", this.roomId);
      } else {
        this.$store.commit("user/setRoomId", null);
      }
    },
    async toggleLockRoom() {
      await api.rooms.toggleLockRoom(this.roomId, {
        lockState: !this.roomData.isBlocked
      });
    },
    async deleteRoom() {
      await api.rooms.deleteRoom(this.roomId);
    }
  }
};
</script>
