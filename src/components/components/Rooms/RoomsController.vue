<template>
  <v-card class="RoomsController pa-2">
    <div class="body-1 mb-4">
      List of Chats
    </div>
    <v-btn block @click="createRoomHandler" class="mb-2">
      {{ $t("buttons.createRoom") }}
    </v-btn>
    <RoomFilter
      :filterData="filterData"
      @submit="fetchRooms"
      @update:roomName="filterData.roomName = $event"
      @update:typeOfRoom="filterData.typeOfRoom = $event"
    />
    <RoomsList :rooms="rooms">
      <template #actions="{ roomData }">
        <v-btn @click="joinRoom(roomData)">
          {{ $t("buttons.join") }}
        </v-btn>
      </template>
    </RoomsList>
  </v-card>
</template>

<script>
import roomLogic from "../../../mixins/roomLogic";

export default {
  name: "RoomsController",
  components: {
    RoomsList: () => import("./RoomsList"),
    RoomFilter: () => import("./RoomFilter")
  },
  mixins: [roomLogic]
};
</script>

<style lang="scss">
.RoomsController {
}
</style>
