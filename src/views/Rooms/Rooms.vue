<script setup>
import RoomsList from "@components/elements/Rooms/RoomsList.vue";
import RoomFilter from "@components/elements/Rooms/RoomFilter.vue";

import { useRoomLogic } from "@composable";

const {
  rooms,
  filterData,

  createRoomHandler,
  joinRoom,
  fetchRooms,
} = useRoomLogic();
</script>

<template>
  <Grid>
    <template #leftCol>
      <Title :title="$t('pages.rooms.roomsFilter')" />
      <v-btn block @click="createRoomHandler" class="mb-2">
        {{ $t("buttons.createRoom") }}
      </v-btn>
      <RoomFilter
        :filterData="filterData"
        @submit="fetchRooms"
        @update:roomName="filterData.roomName = $event"
        @update:typeOfRoom="filterData.typeOfRoom = $event"
      />
    </template>
    <template #rightCol>
      <Title :title="$t('pages.rooms.roomsList')" />
      <RoomsList :rooms="rooms">
        <template #actions="{ roomData }">
          <v-btn @click="joinRoom(roomData)">
            {{ $t("buttons.join") }}
          </v-btn>
        </template>
      </RoomsList>
    </template>
  </Grid>
</template>
