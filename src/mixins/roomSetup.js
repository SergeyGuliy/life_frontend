import {
  rooms_updateRoomAdmin,
  rooms_updateToggleLockRoom,
  rooms_updateUsersListInRoom,
  rooms_userConnectsRoom,
  rooms_userKickedFromRoom
} from "@constants/ws/rooms";
import { api } from "@api";

export default {
  $initSocketListener() {
    api.rooms
      .getRoomById(this.$roomId)
      .then(data => {
        this.$roomData = data;
        this.$gameId = data.gameId;

        this.$socket.client.emit(rooms_userConnectsRoom, {
          userId: this.$user.userId,
          roomId: this.$roomId
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

  methods: {
    updateUserListInRoom(usersInRoom) {
      this.$usersInRoom = usersInRoom;
    },

    updateRoomAdmin(newAdmin) {
      let indexOldAdmin = this.$usersInRoom.findIndex(
        user => typeof user.roomCreatedId === "number"
      );
      this.$store.commit("room/updateUser", {
        index: indexOldAdmin,
        userData: {
          roomCreatedId: null
        }
      });

      let indexNewAdmin = this.$usersInRoom.findIndex(
        user => user.userId === newAdmin.userId
      );
      this.$store.commit("room/updateUser", {
        index: indexNewAdmin,
        userData: {
          roomCreatedId: this.$roomId
        }
      });

      if (newAdmin.userId === this.$user.userId) {
        this.$store.commit("user/setRoomId", this.$roomId);
      } else {
        this.$store.commit("user/setRoomId", null);
      }
    },

    async userKickedFromRoom(userId) {
      this.$store.commit("room/kickUser", userId);

      const isKickedUserMe = +this.$user.userId === +userId;
      if (isKickedUserMe) {
        this.$store.commit("user/leaveRoom");
        await this.$router.push({ name: "Home" });
      }
    },

    updateToggleLockRoom(lockState) {
      this.$roomData = {
        isBlocked: lockState
      };
    },

    gameStarted(game) {
      this.$roomData = {
        gameId: game._id
      };
      this.$gameId = game._id;
    }
  }
};
