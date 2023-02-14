import { createPinia } from "pinia";

export const pinia = createPinia();

export function installPinia(vue) {
  vue.use(pinia);
}
