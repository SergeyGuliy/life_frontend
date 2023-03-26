import { createI18n } from "vue-i18n";

import { en } from "@locales/en";
import { ru } from "@locales/ru";

const messages = { en, ru };

export const i18n = createI18n({
  allowComposition: true, // you need to specify that!
  silentTranslationWarn: true,

  locale: "en",
  fallbackLocale: "en",

  messages,
});

export const installI18n = (vue) => vue.use(i18n);
