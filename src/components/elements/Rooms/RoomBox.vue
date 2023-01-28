<template>
  <v-card class="RoomBox pa-2 mb-2">
    <RoomInfo :roomData="roomData">
      <template #actions="{ roomData }">
        <slot name="actions" :roomData="roomData"></slot>
      </template>
    </RoomInfo>
  </v-card>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "RoomBox",
  components: {
    RoomInfo: defineAsyncComponent(() => import("./RoomInfo.vue")),
  },
  props: {
    roomData: {
      required: true,
      type: Object,
    },
  },
};
</script>

<style lang="scss">
.RoomBox {
}
</style>
