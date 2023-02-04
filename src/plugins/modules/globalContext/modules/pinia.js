import { createPinia } from "pinia";

export const pinia = createPinia();

export function installPinnia(vue) {
  vue.use(pinia)
}
