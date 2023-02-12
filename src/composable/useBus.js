import { onMounted, onUnmounted } from "vue";
import mitt from "mitt";

export function useBus() {
  const bus = mitt();

  function busInit(busObject) {
    const busEntries = Object.entries(busObject);

    busEntries.forEach(([busKey, busCallback]) => {
      onMounted(() => {
        bus.on(busKey, busCallback);
      });

      onUnmounted(() => {
        bus.off(busKey, busCallback);
      });
    });
  }

  return {
    busEmit: bus.emit,
    busInit,
  };
}
