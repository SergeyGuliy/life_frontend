import { api } from "@api";
import {
  rooms_subscribeRoomsUpdate,
  rooms_unSubscribeRoomsUpdate,
  rooms_roomInListCreated,
  rooms_roomInListDeleted,
  rooms_roomInListUpdated
} from "@constants/ws/rooms.js";

export default {
  data() {
    return {
      filterData: {
        roomName: "",
        typeOfRoom: ["PUBLIC"]
      },
      rooms: []
    };
  },
  async $initSocketListener() {
    const typeOfRoom = localStorage.getItem("typeOfRoom");
    if (typeOfRoom) {
      this.$set(this.filterData, "typeOfRoom", typeOfRoom.split(","));
    }
    await this.fetchRooms();
    this.$socket.client.emit(rooms_subscribeRoomsUpdate, {
      userId: this.$user.userId
    });
    this.$socketInit({
      [rooms_roomInListCreated]: this.roomInListCreated,
      [rooms_roomInListDeleted]: this.roomInListDeleted,
      [rooms_roomInListUpdated]: this.roomInListUpdated
    });
  },

  beforeDestroy() {
    this.$socket.client.emit(rooms_unSubscribeRoomsUpdate, {
      userId: this.$user?.userId
    });
  },

  methods: {
    roomInListCreated(roomData) {
      if (this.filterData.typeOfRoom.includes(roomData.typeOfRoom)) {
        this.rooms.push(roomData);
      }
    },
    roomInListDeleted(roomId) {
      this.rooms.splice(
        this.rooms.findIndex(i => i.roomId === roomId),
        1
      );
    },
    roomInListUpdated({ roomId, roomData }) {
      const roomIndex = this.rooms.findIndex(room => +room.roomId === +roomId);
      this.$set(this.rooms, roomIndex, roomData);
    },
    async createRoomHandler() {
      await this.$openModal("CreateRoom")
        .then(data => {
          this.$store.commit("user/joinRoom", data.roomId);
          this.$router.push({ name: "RoomId", params: { id: data.roomId } });
        })
        .catch(() => {});
    },
    async fetchRooms() {
      localStorage.setItem("typeOfRoom", this.filterData.typeOfRoom);
      api.rooms.getRooms(this.filterData).then(data => {
        this.rooms = data;
      });
    },

    async joinRoom(roomData) {
      let { typeOfRoom, roomName, roomId } = roomData;
      if (typeOfRoom === "PRIVATE") {
        await this.$openModal("EnterPassword", {
          title: "To enter room you need to input its password",
          submit: "enter",
          cancel: "cancel",
          roomId
        }).catch(() => {});
      } else {
        await this.$openModal("Promt", {
          title: `${this.$t("modals.enterRoom")} ${roomName} ?`,
          submit: this.$t("buttons.join"),
          cancel: this.$t("buttons.cancel")
        })
          .then(() =>
            api.rooms.joinRoom(roomId).then(data => {
              this.$store.commit("user/joinRoom", data.roomJoinedId);
              this.$router.push({
                name: "RoomId",
                params: { id: data.roomJoinedId }
              });
            })
          )
          .catch(() => {});
      }
    }
  }
};
