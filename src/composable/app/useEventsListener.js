import { useEventListener } from "@vueuse/core";

export function useEventsListener(eventListenersObject) {
  const eventListenersEntries = Object.entries(eventListenersObject);

  eventListenersEntries.forEach(
    ([eventListenerKey, [eventListenerCallback, target]]) => {
      useEventListener(target, eventListenerKey, eventListenerCallback);
    }
  );
}
