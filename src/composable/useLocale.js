import { i18n } from "@plugins";

export function useLocale() {
  const changeLocale = (locale) => (i18n.global.locale = locale);

  return {
    changeLocale,
    currentLocale: i18n.global,
    t: i18n.global.t,
  };
}
