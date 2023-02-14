<script setup>
import { useRoomLogic } from "@mixins/useRoomLogic";
import RoomsList from "@components/elements/Rooms/RoomsList.vue";
import RoomFilter from "@components/elements/Rooms/RoomFilter.vue";

const {
  rooms,
  filterData,

  createRoomHandler,
  joinRoom,
  fetchRooms,
} = useRoomLogic();
</script>

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
