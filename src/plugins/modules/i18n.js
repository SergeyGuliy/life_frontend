import Vue from "vue";
import VueI18n from "vue-i18n";
Vue.use(VueI18n);
import { en } from "../../locales/en";
import { ru } from "../../locales/ru";

const messages = {
  en,
  ru
};

export const i18n = new VueI18n({
  locale: "en",
  messages
});
