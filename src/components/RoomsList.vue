<template>
  <v-card class="RoomsList pa-2">
    RoomsList
    <RoomBox
      v-for="(roomData, index) in rooms"
      :key="index"
      :roomData="roomData"
    />
  </v-card>
</template>

<script>
export default {
  name: "RoomsList",
  components: {
    RoomBox: () => import("./RoomBox")
  },
  data() {
    return {
      rooms: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    };
  }
};
</script>

<style lang="scss">
.RoomsList {
}
</style>
