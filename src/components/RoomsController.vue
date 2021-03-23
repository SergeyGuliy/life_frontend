<template>
  <v-card class="RoomsController pa-2">
    <div class="title">{{ $t("key1") }}</div>
    <v-btn block @click="createRoomHandler" class="mb-2">Create room</v-btn>
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
import { api } from "../assets/helpers/api";

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
      rooms: null
    };
  },
  async created() {
    this.fetchRooms();
  },
  methods: {
    async createRoomHandler() {
      await this.$openModal("CreateRoom")
        .then(data => {
          this.$store.commit("user/joinRoom", data.roomId);
          this.$router.push({ name: "RoomId", params: { id: data.roomId } });
        })
        .catch(e => {
          console.log(e);
        });
    },
    async fetchRooms() {
      this.rooms = (await api.rooms.getRooms(this.filterData)).data;
    }
  }
};
</script>

<style lang="scss">
.RoomsController {
}
</style>
