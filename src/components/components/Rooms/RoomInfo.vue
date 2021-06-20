<template>
  <div class="RoomInfo">
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
    <v-card-subtitle class="py-0">
      {{ $t("UI.roomId") }} {{ roomData.roomId }}
    </v-card-subtitle>
    <v-card-text class="text--primary d-flex">
      <div class="mr-2">
        {{ $t("UI.min") }} {{ roomData.minCountOfUsers }}
      </div>
      <div class="mr-2">
        {{ $t("UI.max") }} {{ roomData.maxCountOfUsers }}
      </div>
      <div class="mr-2">
        {{ $t("UI.current") }} {{ roomData.usersInRoomLength }}
      </div>
    </v-card-text>

    <v-card-actions>
      <slot name="actions" :roomData="roomData"></slot>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  name: "RoomInfo",
  components: {},
  props: {
    roomData: {
      required: true,
      type: Object
    }
  }
};
</script>
