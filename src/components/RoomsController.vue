<template>
  <v-card class="RoomsController pa-2">
    <div class="title">{{ $t("key1") }}</div>
    <v-btn block @click="createRoomHandler">Create room</v-btn>
    <RoomFilter />
    <RoomsList />
  </v-card>
</template>

<script>
export default {
  name: "RoomsController",
  components: {
    RoomsList: () => import("./RoomsList"),
    RoomFilter: () => import("./RoomFilter")
  },
  data() {
    return {};
  },
  methods: {
    async createRoomHandler() {
      await this.$openModal("CreateRoom")
        .then(value => {
          console.log("closed");
          console.log(value);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style lang="scss">
.RoomsController {
}
</style>
