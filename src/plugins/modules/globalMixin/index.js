import Vue from "vue";

import game from "@plugins/modules/globalMixin/modules/game";

let mixins = [game];

mixins.forEach((mixin) => {
  Vue.mixin(mixin);
});
