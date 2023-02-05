import Vue from "vue";

import busInit from "@plugins/modules/globalMixin/modules/busInit";
import game from "@plugins/modules/globalMixin/modules/game";
import room from "@plugins/modules/globalMixin/modules/room";
import socketInit from "@plugins/modules/globalMixin/modules/socketInit";
import users from "@plugins/modules/globalMixin/modules/users";

let mixins = [busInit, game, socketInit, users, room];

mixins.forEach((mixin) => {
  Vue.mixin(mixin);
});
