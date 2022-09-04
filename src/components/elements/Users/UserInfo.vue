<template>
  <div class="UserInfo">
    <div class="d-flex align-center">
      <v-card-title class="py-0">{{ userData | getUserName }} </v-card-title>
      <v-spacer></v-spacer>

      <v-chip
        v-if="showUserRoomInfo && isRoomAdmin"
        color="blue"
        text-color="white"
        small
        class="mx-2"
      >
        {{ $t(`enums.ROOM_ADMIN`) }}
      </v-chip>
      <v-chip
        :color="userData.role === 'PUBLIC' ? 'primary' : 'warning'"
        text-color="white"
        small
        class="mx-2"
      >
        {{ $t(`enums.${userData.role}`) }}
      </v-chip>
      <v-chip
        :color="userData.userOnlineStatus === 'OFFLINE' ? 'red' : 'green'"
        text-color="white"
        small
        class="mx-2"
      >
        {{ $t(`enums.${userData.userOnlineStatus}`) }}
      </v-chip>
    </div>
    <v-card-subtitle class="py-0">
      {{ $t(`misc.userId`) }} {{ userData.userId }}
    </v-card-subtitle>
    <v-card-text class="text--primary" v-if="showUserRoomInfo">
      <div>
        {{ $t(`misc.userGameStatus`) }}
        {{ $t(`enums.${userData.userGameStatus}`) }}
      </div>
      <div>{{ $t(`misc.roomJoinedId`) }} {{ userData.roomJoinedId }}</div>
    </v-card-text>
  </div>
</template>

<script>
export default {
  name: "UserInfo",

  computed: {
    isRoomAdmin() {
      const { roomJoinedId, roomCreatedId } = this.userData;
      const isNum = num => typeof num === "number";

      return (
        isNum(roomJoinedId) &&
        isNum(roomCreatedId) &&
        roomJoinedId === roomCreatedId
      );
    }
  },

  props: {
    userData: {
      required: true,
      type: Object
    },
    showUserRoomInfo: {
      default: () => false,
      type: Boolean
    }
  }
};
</script>
