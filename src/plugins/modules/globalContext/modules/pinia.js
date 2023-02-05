import { createPinia } from "pinia";

const pinia = createPinia();

export function installPinia(vue) {
  vue.use(pinia);
}
