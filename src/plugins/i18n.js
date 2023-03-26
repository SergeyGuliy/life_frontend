import { createI18n } from "vue-i18n";

import { messages } from "@locales";

export const i18n = createI18n({
  allowComposition: true,
  silentTranslationWarn: true,

  locale: "en",
  fallbackLocale: "en",

  messages,
});

export const installI18n = (vue) => vue.use(i18n);
