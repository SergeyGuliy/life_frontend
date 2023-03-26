import { useRoute } from "vue-router";

import { router } from "@plugins";

export function useMyRouter() {
  return {
    routerPush: router.push,
    routeName: useRoute().name,
    routeMeta: useRoute().meta,
    routeParams: useRoute().params,
  };
}
