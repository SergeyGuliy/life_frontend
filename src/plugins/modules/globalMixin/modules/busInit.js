export default {
  methods: {
    $busInit(busObject) {
      const busEntries = Object.entries(busObject);

      busEntries.forEach(([busKey, busCallback]) => {
        this.$bus.on(busKey, busCallback);

        this.$on("hook:beforeDestroy", () => {
          this.$bus.off(busKey, busCallback);
        });
      });
    }
  }
};
