import { longClickDirective } from "vue-long-click";

const longClickInstance = longClickDirective({ delay: 400, interval: 50 });

export const installGlobalDirectives = (vue) =>
  vue.directive("longclick", longClickInstance);
