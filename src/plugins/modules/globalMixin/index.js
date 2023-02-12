import Vue from "vue";

import game from "@plugins/modules/globalMixin/modules/game";
import socketInit from "@plugins/modules/globalMixin/modules/socketInit";
import users from "@plugins/modules/globalMixin/modules/users";

let mixins = [game, socketInit, users];

mixins.forEach((mixin) => {
  Vue.mixin(mixin);
});
