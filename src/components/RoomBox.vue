<template>
  <v-card class="RoomBox pa-2 mb-2">
    <div class="d-flex justify-space-between align-center">
      <v-card-title class="py-0">{{ roomData.roomName }} </v-card-title>

      <v-chip
        :color="roomData.typeOfRoom === 'PUBLIC' ? 'primary' : 'warning'"
        text-color="white"
        small
        class="ml-2 mr-4 ml-0"
      >
        <v-icon left>
          {{
            roomData.typeOfRoom === "PUBLIC"
              ? "mdi-account-group"
              : "mdi-account-key"
          }}
        </v-icon>
        {{ roomData.typeOfRoom }}
      </v-chip>
    </div>
    <v-card-subtitle class="py-0">ID: {{ roomData.roomId }}</v-card-subtitle>
    <v-card-text class="text--primary d-flex justify-space-between">
      <div>Min: {{ roomData.minCountOfUsers }}</div>
      <div>Max: {{ roomData.maxCountOfUsers }}</div>
      <div>Current: {{ roomData.maxCountOfUsers }}</div>
    </v-card-text>
    <v-card-actions>
      <v-btn block @click="joinRoom">
        Join
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "RoomBox",
  components: {},
  props: {
    roomData: {
      required: true,
      type: Object
    }
  },
  data() {
    return {};
  },
  methods: {
    joinRoom() {

    }
  }
};
</script>

<style lang="scss">
.RoomBox {
}
</style>
