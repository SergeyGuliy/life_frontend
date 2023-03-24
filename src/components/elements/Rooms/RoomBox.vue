<script setup>
import RoomInfo from "./RoomInfo.vue";

defineProps({
  roomData: { required: true, type: Object },
});
</script>

<template>
  <v-card class="RoomBox pa-2 mb-2">
    <RoomInfo :roomData="roomData">
      <template #actions="{ roomData }">
        <slot name="actions" :roomData="roomData"></slot>
      </template>
    </RoomInfo>
  </v-card>
</template>
