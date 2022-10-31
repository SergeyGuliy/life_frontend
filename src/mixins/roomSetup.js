import {
  rooms_updateRoomAdmin,
  rooms_updateToggleLockRoom,
  rooms_updateUsersListInRoom,
  rooms_userConnectsRoom,
  rooms_userKickedFromRoom
} from "@constants/ws/rooms";
import { api } from "@/utils/api";

export default {
  $initSocketListener() {
    api.rooms
      .getRoomById(this.roomId)
      .then(data => {
        this.roomData = data;
        this.$gameId = data.gameId;
        this.$socket.client.emit(rooms_userConnectsRoom, {
          userId: this.$user.userId,
          roomId: this.roomData.roomId
        });
        this.$socketInit({
          [rooms_updateUsersListInRoom]: this.updateUserListInRoom,
          [rooms_updateRoomAdmin]: this.updateRoomAdmin,
          [rooms_userKickedFromRoom]: this.userKickedFromRoom,
          [rooms_updateToggleLockRoom]: this.updateToggleLockRoom,
          games_gameStarted: this.gameStarted
        });
      })
      .catch(() => {
        this.$store.commit("user/leaveRoom");
        this.$router.push({ name: "Home" });
      });
  },

  data() {
    return {
      roomData: null
    };
  },

  computed: {
    usersInRoom() {
      return this.roomData?.usersInRoom || [];
    }
  },

  methods: {
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

    gameStarted(game) {
      this.roomData.gameId = game._id;
    }
  }
};
