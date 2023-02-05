export function useSocket() {
  function socketConnect() {
    // myVue.$socket.client.connect();
  }

  function socketDisconnect() {
    // myVue.$socket.client.close();
  }

  return {
    socketConnect,
    socketDisconnect,
  };
}
