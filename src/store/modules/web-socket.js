import Vue from "vue";
// import VueSocketIOExt from "vue-socket.io-extended";
// import { io } from "socket.io-client";
// import store from "../index";

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async socketConnect() {
      // const socket = io("http://localhost:3000/", {
      //   transports: ["websocket"],
      //   query: {
      //     "my-key": store.state.auth.user.userId
      //   }
      // });
      //
      // await socket.addEventListener("details", (...args) => {
      //   console.log(args);
      // });
      //
      // // Vue.use(VueSocketIOExt, socket, { store });
      // // if (!Vue.prototype.$socket.connected) {
      // //   await Vue.prototype.$socket.client.connect();
      // // }
      // // Vue.prototype.$socket.client.on("msgToClient", message => {
      // //   console.error(message);
      // // });
      // setInterval(() => {
      //   socket.emit("msgToServer", { my: "data" });
      // }, 1000);
    },

    async socketDisconnect() {
      await Vue.prototype.$socket.client.disconnect();
    }
  }
};
