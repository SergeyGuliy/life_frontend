export default {
  created() {
    const $initSocketListener = this?.$options?.$initSocketListener;
    if ($initSocketListener) {
      const wrappedCallback = () => {
        if (!this.$socket?.connected) return;
        $initSocketListener.call(this);
      };
      wrappedCallback();
      this.$watch("$socket.connected", wrappedCallback);
    }
  },

  methods: {
    $socketInit(socketObject) {
      const socketEntries = Object.entries(socketObject);

      socketEntries.forEach(([socketKey, socketCallback]) => {
        this.$socket.client.on(socketKey, socketCallback);

        this.$on("hook:beforeDestroy", () => {
          this.$socket.client.off(socketKey, socketCallback);
        });
        this.$watch("$socket.connected", (val) => {
          if (val) return;

          this.$socket.client.off(socketKey, socketCallback);
          this.$socket.client.off(socketKey, socketCallback);
        });
      });
    },
  },
};
