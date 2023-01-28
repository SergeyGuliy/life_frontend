import { createI18n } from "vue-i18n";

import { en } from "../../locales/en.js";
import { ru } from "../../locales/ru.js";

const messages = {
  en,
  ru,
};

export const i18n = createI18n({
  allowComposition: true, // you need to specify that!
  silentTranslationWarn: true,

  locale: "en",
  fallbackLocale: "en",

  messages,
});
