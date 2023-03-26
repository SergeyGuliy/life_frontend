import { i18n } from "../plugins/modules/globalContext/modules/i18n";

export function useLocale() {
  const changeLocale = (locale) => (i18n.global.locale = locale);

  return {
    changeLocale,
    currentLocale: i18n.global,
    t: i18n.global.t,
  };
}
