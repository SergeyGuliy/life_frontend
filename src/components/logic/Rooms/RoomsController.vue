<template>
  <v-card class="RoomsController pa-2">
    <div class="title">{{ $t("key1") }}</div>
    <v-btn block @click="createRoomHandler" class="mb-2">{{
      $t("btns.createRoom")
    }}</v-btn>
    <RoomFilter
      :filterData="filterData"
      @submit="fetchRooms"
      @update:roomName="filterData.roomName = $event"
      @update:typeOfRoom="filterData.typeOfRoom = $event"
    />
    <RoomsList :rooms="rooms" />
  </v-card>
</template>

<script>
import { api } from "../../../assets/helpers/api";

export default {
  name: "RoomsController",
  components: {
    RoomsList: () => import("./RoomsList"),
    RoomFilter: () => import("./RoomFilter")
  },
  data() {
    return {
      filterData: {
        roomName: "",
        typeOfRoom: ["PUBLIC"]
      },
      rooms: []
    };
  },
  sockets: {
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
    }
  },
  async created() {
    const typeOfRoom = localStorage.getItem("typeOfRoom");
    if (typeOfRoom) {
      this.$set(this.filterData, "typeOfRoom", typeOfRoom.split(","));
    }
    await this.fetchRooms();
    this.$socket.emit("subscribeRoomsUpdate", {
      userId: this.$user.userId
    });
  },
  beforeDestroy() {
    this.$socket.emit("unSubscribeRoomsUpdate", {
      userId: this.$user?.userId
    });
  },
  methods: {
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
    }
  }
};
</script>

<style lang="scss">
.RoomsController {
}
</style>
