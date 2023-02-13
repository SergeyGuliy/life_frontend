import { vuetify } from "../plugins/modules/globalContext/modules/vuetify";

export function useVuetifyTheme() {
  const { name, current } = vuetify.theme.global;

  function toggleTheme() {
    name.value = current.value.dark ? "light" : "dark";
  }

  function setTheme(isDarkTheme) {
    name.value = isDarkTheme ? "dark" : "light";
  }

  return { toggleTheme, setTheme };
}
