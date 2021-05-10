<template>
  <v-card class="UserBox pa-2 mb-2">
    <UserInfo :userData="userData" :showUserRoomInfo="showUserRoomInfo"/>
    <!--    <v-card-actions>-->
    <!--      <v-btn block @click="joinRoom(roomData)">-->
    <!--        Join-->
    <!--      </v-btn>-->
    <!--    </v-card-actions>-->
  </v-card>
</template>

<script>
export default {
  name: "UserBox",
  components: {
    UserInfo: () => import("./UserInfo")
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
