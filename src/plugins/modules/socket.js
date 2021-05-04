import Vue from "vue";
import store from "../../store";
import VueSocketIO from "vue-socket.io";
import { io } from "socket.io-client";

const socketOptions = {
  transports: ["websocket"],
  autoConnect: false
  // query: {
  //   "my-key": rootState.user.user.userId
  // }
};

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: io("ws://localhost:3000", socketOptions),
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    }
  })
);
