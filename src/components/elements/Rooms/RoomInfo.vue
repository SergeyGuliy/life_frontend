<template>
  <div class="RoomInfo">
    <div class="d-flex justify-space-between align-center">
      <v-card-title class="py-0">{{ roomData.roomName }} </v-card-title>

      <v-chip
        :color="getChipClass"
        text-color="white"
        small
        class="ml-2 mr-4 ml-0"
      >
        <v-icon left>
          {{ getChipType }}
        </v-icon>
        {{ roomData.typeOfRoom }}
      </v-chip>
    </div>
    <v-card-subtitle class="py-0">
      {{ $t("misc.roomId") }} {{ roomData.roomId }}
    </v-card-subtitle>
    <v-card-text class="text--primary d-flex">
      <div class="mr-2">
        {{ $t("misc.min") }} {{ roomData.minCountOfUsers }}
      </div>
      <div class="mr-2">
        {{ $t("misc.max") }} {{ roomData.maxCountOfUsers }}
      </div>
      <div class="mr-2">
        {{ $t("misc.current") }} {{ roomData.usersInRoomLength }}
      </div>
    </v-card-text>

    <v-card-actions>
      <slot name="actions" :roomData="roomData"></slot>
    </v-card-actions>
  </div>
</template>

<script>
import { ROOM_TYPES } from "@enums/index";

export default {
  name: "RoomInfo",
  computed: {
    getChipClass() {
      return this.roomData.typeOfRoom === ROOM_TYPES.PUBLIC
        ? "primary"
        : "warning";
    },
    getChipType() {
      return this.roomData.typeOfRoom === ROOM_TYPES.PUBLIC
        ? "mdi-account-group"
        : "mdi-account-key";
    }
  },
  props: {
    roomData: {
      required: true,
      type: Object
    }
  }
};
</script>
