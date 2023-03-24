<script setup>
import { computed } from "vue";

import { ROOM_TYPES } from "@enums/index.mjs";
import { useRooms } from "@composable/useRooms";

const { usersInRoom } = useRooms();

const props = defineProps({
  roomData: { required: true, type: Object },
});

const getChipClass = computed(() =>
  props.roomData.typeOfRoom === ROOM_TYPES.PUBLIC ? "primary" : "warning"
);
const getChipType = computed(() =>
  props.roomData.typeOfRoom === ROOM_TYPES.PUBLIC
    ? "mdi-account-group"
    : "mdi-account-key"
);
</script>

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
      <div class="mr-2">{{ $t("misc.current") }} {{ usersInRoom.length }}</div>
    </v-card-text>

    <v-card-actions>
      <slot name="actions" :roomData="roomData"></slot>
    </v-card-actions>
  </div>
</template>
