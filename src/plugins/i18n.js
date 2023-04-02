import { createI18n } from "vue-i18n";

import { messages } from "@locales";

const defaultLocale = "en";

export const i18n = createI18n({
  allowComposition: true,
  silentTranslationWarn: true,

  locale: defaultLocale,
  fallbackLocale: defaultLocale,

  messages,
});

export const installI18n = (vue) => vue.use(i18n);
