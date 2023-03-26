import { vuetify } from "@plugins";

export function useVuetifyTheme() {
  const { name, current } = vuetify.theme.global;

  const toggleTheme = () =>
    (name.value = current.value.dark ? "light" : "dark");

  const setTheme = (isDark) => (name.value = isDark ? "dark" : "light");

  return { toggleTheme, setTheme };
}
