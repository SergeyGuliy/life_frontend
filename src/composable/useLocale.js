import { i18n } from "../plugins/modules/globalContext/modules/i18n";

export function useLocale() {
  function changeLocale(locale) {
    i18n.global.locale = locale;
  }

  return {
    changeLocale,
  };
}
