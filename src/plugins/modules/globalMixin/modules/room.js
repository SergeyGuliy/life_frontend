export default {
  computed: {
    $roomData: {
      get() {
        return this.$store.state.room.roomData;
      },
      set(val) {
        this.$store.commit("room/setRoomData", val);
      }
    },
    $usersInRoom: {
      get() {
        return this.$store.state.room.roomData?.usersInRoom || [];
      },
      set(val) {
        this.$store.commit("room/setUsersInRoom", val);
      }
    },

    $roomId() {
      return +this.$route.params.id;
    },
    $isRoomAdmin() {
      return this.$user.roomCreatedId === this.$roomId;
    }
  }
};
