export default {
  methods: {
    $eventListenersInit(eventListenersObject) {
      const eventListenersEntries = Object.entries(eventListenersObject);

      eventListenersEntries.forEach(
        ([eventListenerKey, [eventListenerCallback, target]]) => {
          target.addEventListener(eventListenerKey, eventListenerCallback);

          this.$on("hook:beforeDestroy", () => {
            target.removeEventListener(eventListenerKey, eventListenerCallback);
          });
        }
      );
    },
  },
};
