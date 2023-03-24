<script setup>
import RoomBox from "./RoomBox.vue";

defineProps({
  rooms: { type: Array, default: () => [] },
});
</script>

<template>
  <div class="RoomsList pa-0">
    <RoomBox
      v-for="(roomData, index) in rooms"
      :key="index"
      :roomData="roomData"
    >
      <template #actions="{ roomData }">
        <slot name="actions" :roomData="roomData"></slot>
      </template>
    </RoomBox>
  </div>
</template>
