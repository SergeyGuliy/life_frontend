import Vue from "vue";

import busInit from "@/plugins/modules/globalMixin/modules/busInit";
import eventListenersInit from "@/plugins/modules/globalMixin/modules/eventListenersInit";
import game from "@/plugins/modules/globalMixin/modules/game";
import modal from "@/plugins/modules/globalMixin/modules/modal";
import notify from "@/plugins/modules/globalMixin/modules/notify";
import socketInit from "@/plugins/modules/globalMixin/modules/socketInit";
import users from "@/plugins/modules/globalMixin/modules/users";

let mixins = [
  busInit,
  eventListenersInit,
  game,
  modal,
  notify,
  socketInit,
  users
];

mixins.forEach(mixin => {
  Vue.mixin(mixin);
});
