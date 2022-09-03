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
  async mounted() {
    this.intiComponent();
    this.$watch("$socket.connected", this.intiComponent);
  },
  beforeDestroy() {
    this.$socket.client.emit(rooms_unSubscribeRoomsUpdate, {
      userId: this.$user?.userId
    });
    this.$socket.client.off(rooms_roomInListCreated, this.roomInListCreated);
    this.$socket.client.off(rooms_roomInListDeleted, this.roomInListDeleted);
    this.$socket.client.off(rooms_roomInListUpdated, this.roomInListUpdated);
  },
  methods: {
    async intiComponent() {
      if (!this.$socket.connected) return;

      const typeOfRoom = localStorage.getItem("typeOfRoom");
      if (typeOfRoom) {
        this.$set(this.filterData, "typeOfRoom", typeOfRoom.split(","));
      }
      await this.fetchRooms();
      this.$socket.client.emit(rooms_subscribeRoomsUpdate, {
        userId: this.$user.userId
      });
      this.$socket.client.on(rooms_roomInListCreated, this.roomInListCreated);
      this.$socket.client.on(rooms_roomInListDeleted, this.roomInListDeleted);
      this.$socket.client.on(rooms_roomInListUpdated, this.roomInListUpdated);
    },

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
      this.rooms = (await api.rooms.getRooms(this.filterData)).data;
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
            api.rooms.joinRoom(roomId).then(({ data }) => {
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
