<template>
  <div class="RoomsList pa-2">
    <RoomBox
      v-for="(roomData, index) in rooms"
      :key="index"
      :roomData="roomData"
    />
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
