<template>
  <!--    <template v-if="users">-->
  <!--      <div v-for="(user, index) in users.data" :key="index">{{ user }}</div>-->
  <!--    </template>-->
  <!--    {{ sss }}-->
  <v-container class="home">
    <v-row>
      <v-col cols="6">
        {{ users }}
        <!--        {{ rooms }}-->
      </v-col>
      <v-col cols="6">
        <RoomsController />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import { io } from "socket.io-client";
export default {
  name: "Home",
  components: {
    RoomsController: () => import("../components/RoomsController")
  },
  data() {
    return {
      users: null,
      sss: null
    };
  },
};
</script>
