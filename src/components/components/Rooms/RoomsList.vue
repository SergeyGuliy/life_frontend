<template>
  <div class="RoomsList pa-2">
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

<script>
export default {
  name: "RoomsList",
  props: {
    rooms: {
      type: Array,
      default: () => []
    }
  },
  components: {
    RoomBox: () => import("./RoomBox")
  }
};
</script>
