import { API_getRooms, API_joinRoom } from "@api/rooms";

import { useModal } from "@composable/useModal";
const { openModal } = useModal();

import { useSocket } from "./composable/useSocket";
const { onSocketInit, socketEmit } = useSocket();

import {
  rooms_subscribeRoomsUpdate,
  rooms_unSubscribeRoomsUpdate,
  rooms_roomInListCreated,
  rooms_roomInListDeleted,
  rooms_roomInListUpdated,
} from "@constants/ws/rooms.js";

export default {
  data() {
    return {
      filterData: {
        roomName: "",
        typeOfRoom: ["PUBLIC"],
      },
      rooms: [],
    };
  },

  async created() {
    const typeOfRoom = localStorage.getItem("typeOfRoom");
    if (typeOfRoom) {
      this.$set(this.filterData, "typeOfRoom", typeOfRoom.split(","));
    }
    await this.fetchRooms();

    socketEmit(rooms_subscribeRoomsUpdate, { userId: this.$user.userId });

    onSocketInit({
      [rooms_roomInListCreated]: this.roomInListCreated,
      [rooms_roomInListDeleted]: this.roomInListDeleted,
      [rooms_roomInListUpdated]: this.roomInListUpdated,
    });
  },

  beforeDestroy() {
    socketEmit(rooms_unSubscribeRoomsUpdate, { userId: this.$user?.userId });
  },

  methods: {
    roomInListCreated(roomData) {
      if (this.filterData.typeOfRoom.includes(roomData.typeOfRoom)) {
        this.rooms.push(roomData);
      }
    },
    roomInListDeleted(roomId) {
      this.rooms.splice(
        this.rooms.findIndex((i) => i.roomId === roomId),
        1
      );
    },
    roomInListUpdated({ roomId, roomData }) {
      const roomIndex = this.rooms.findIndex(
        (room) => +room.roomId === +roomId
      );
      this.$set(this.rooms, roomIndex, roomData);
    },
    async createRoomHandler() {
      await openModal("CreateRoom")
        .then((data) => {
          this.$store.commit("user/adminRoom", data.roomId);
          this.$store.commit("user/joinRoom", data.roomId);
          this.$router.push({ name: "RoomId", params: { id: data.roomId } });
        })
        .catch(() => {});
    },
    async fetchRooms() {
      localStorage.setItem("typeOfRoom", this.filterData.typeOfRoom);
      API_getRooms(this.filterData).then((data) => {
        this.rooms = data;
      });
    },

    async joinRoom(roomData) {
      let { typeOfRoom, roomName, roomId } = roomData;
      if (typeOfRoom === "PRIVATE") {
        await openModal("EnterPassword", {
          title: "To enter room you need to input its password",
          submit: "enter",
          cancel: "cancel",
          roomId,
        }).catch(() => {});
      } else {
        await openModal("Promt", {
          title: `${this.$t("modals.enterRoom")} ${roomName} ?`,
          submit: this.$t("buttons.join"),
          cancel: this.$t("buttons.cancel"),
        })
          .then(() =>
            API_joinRoom(roomId).then((data) => {
              this.$store.commit("user/joinRoom", data.roomJoinedId);
              this.$router.push({
                name: "RoomId",
                params: { id: data.roomJoinedId },
              });
            })
          )
          .catch(() => {});
      }
    },
  },
};
