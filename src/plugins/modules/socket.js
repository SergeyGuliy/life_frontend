import Vue from "vue";
import VueSocketIO from "vue-socket.io";
import { io } from "socket.io-client";

const socketOptions = {
  transports: ["websocket"],
  autoConnect: false
};

Vue.use(
  new VueSocketIO({
    debug: false,
    connection: io("ws://localhost:3000", socketOptions)
  })
);
