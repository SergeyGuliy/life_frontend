<template>
  <!--    <template v-if="users">-->
  <!--      <div v-for="(user, index) in users.data" :key="index">{{ user }}</div>-->
  <!--    </template>-->
  <!--    {{ sss }}-->
  <v-container class="home">
    <v-row>
      <v-col cols="6"></v-col>
      <v-col cols="6">
        <RoomsController />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { api } from "../assets/helpers/api";
import store from "../store";
import { io } from "socket.io-client";
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
  async created() {
    this.users = await api.users.getAllUsers();
    // console.log(this.users);
    // this.$socket.client.on("msgToClient", message => {
    //   console.error(message);
    // });
    // setInterval(() => {
    //   console.log("msgToServer");
    //   this.$socket.client.emit("msgToServer", { msg: "qweqwe" });
    // }, 1000);
  },
  mounted() {
    const socket = io("ws://localhost:3000", {
      transports: ["websocket"],
      query: {
        "my-key": store.state.user.user.userId
      }
    });

    socket.on("connection", function(socket2) {
      socket2.on("disconnect", function() {
        console.log("Client disconnected.");
      });
    });
    socket.on("joinedRoom", (...args) => {
      this.sss = args;
    });

    socket.emit("joinRoom", "room-id");
  }
};
</script>
