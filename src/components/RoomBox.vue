<template>
  <v-card class="RoomBox pa-2"> RoomBox-{{ roomData }} </v-card>
</template>

<script>
export default {
  name: "RoomBox",
  components: {},
  props: {
    roomData: {
      required: true,
      type: Number
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.RoomBox {
}
</style>
