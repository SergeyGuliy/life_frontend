import {useTheme} from "vuetify";

export function useVuetifyTheme() {
  const theme = useTheme()

  function toggleTheme () {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
  }

  function setTheme(isDarkTheme) {
    theme.global.name.value = isDarkTheme ? 'dark' : 'light'
  }

  return {toggleTheme, setTheme}
}
