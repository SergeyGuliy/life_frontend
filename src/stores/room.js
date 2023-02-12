import { defineStore } from "pinia";

export const useStoreRooms = defineStore("rooms", {
  state: () => ({
    roomData: null,
  }),
  actions: {
    setRoomData(roomData) {
      this.roomData = {
        ...this.roomData,
        ...roomData,
      };
    },
    setUsersInRoom(usersInRoom) {
      this.roomData.usersInRoom = usersInRoom;
    },
    updateUser({ index, userData }) {
      this.roomData.usersInRoom[index] = {
        ...this.roomData.usersInRoom[index],
        ...userData,
      };
    },
    kickUser(userId) {
      let indexKicked = this.roomData.usersInRoom.findIndex(
        (user) => +user.userId === +userId
      );
      this.roomData.usersInRoom = this.roomData.usersInRoom.filter(
        (_, index) => index !== indexKicked
      );
    },
  },
});
