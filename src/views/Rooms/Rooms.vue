<template>
  <div class="rooms container__inner">
    <v-row>
      <v-col class="px-1" cols="6">
        <v-card class="pa-2">
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
        </v-card>
      </v-col>
      <v-col class="px-1" cols="6">
        <v-card class="pa-2">
          <div class="body-1 mb-4">
            List of Chats
          </div>
          <RoomsList :rooms="rooms">
            <template #actions="{ roomData }">
              <v-btn @click="joinRoom(roomData)">
                {{ $t("buttons.join") }}
              </v-btn>
            </template>
          </RoomsList>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import roomLogic from "../../mixins/roomLogic";

export default {
  name: "Rooms",
  components: {
    RoomsList: () => import("../../components/components/Rooms/RoomsList"),
    RoomFilter: () => import("../../components/components/Rooms/RoomFilter")
  },
  mixins: [roomLogic]
};
</script>

<style lang="scss">
.rooms {
}
</style>
