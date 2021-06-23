import Vue from "vue";
import VueSocketIOExt from "vue-socket.io-extended";
import { io } from "socket.io-client";

const socket = io("ws://localhost:3000", {
  transports: ["websocket"],
  autoConnect: false
});

Vue.use(VueSocketIOExt, socket);
