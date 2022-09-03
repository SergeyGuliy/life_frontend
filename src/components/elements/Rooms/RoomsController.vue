<template>
  <div class="RoomsController">
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
  </div>
</template>

<script>
import roomLogic from "@mixins/roomLogic";

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
