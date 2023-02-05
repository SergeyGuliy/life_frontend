export default {
  namespaced: true,
  state: {
    roomData: null,
  },
  mutations: {
    setRoomData(state, roomData) {
      state.roomData = {
        ...state.roomData,
        ...roomData,
      };
    },
    setUsersInRoom(state, usersInRoom) {
      state.roomData.usersInRoom = usersInRoom;
    },
    updateUser(state, { index, userData }) {
      state.roomData.usersInRoom[index] = {
        ...state.roomData.usersInRoom[index],
        ...userData,
      };
    },
    kickUser(state, userId) {
      let indexKicked = state.roomData.usersInRoom.findIndex(
        (user) => +user.userId === +userId
      );
      state.roomData.usersInRoom = state.roomData.usersInRoom.filter(
        (_, index) => index !== indexKicked
      );
    },
  },
};
