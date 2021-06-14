export default {
  sockets: {
    callUserIdToServer(clientId) {
      if (this.$user?.userId) {
        this.$socket.emit("giveUserIdToServer", {
          userId: this.$user.userId,
          clientId
        });
      }
    }
  }
};
