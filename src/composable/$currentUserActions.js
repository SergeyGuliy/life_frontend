import { ProfileSettingsParser } from "../utils/parsers";
import { clearLocalStorageKeys } from "../utils/localStorageKeys";
import { myVue } from "@main";

export function $currentUserActions() {
  async function updateUserSettings(settings) {
    await ProfileSettingsParser.pushNewUserSettings(settings);
  }
  async function logOutMiddleware() {
    if (myVue.$route.name === "RoomId") {
      await myVue
        .$openModal("Promt", {
          title: myVue.$t("modals.wantLeaveRoom"),
          submit: myVue.$t("buttons.leave"),
          cancel: myVue.$t("buttons.cancel")
        })
        .then(logOut)
        .catch(() => {});
    } else {
      logOut();
    }
  }
  async function logOut() {
    try {
      await myVue.$store.dispatch("auth/logOut");
    } catch (e) {
      myVue.$emit("onError", e);
    }
    clearLocalStorageKeys();
    await myVue.$router.push({ name: "Auth" });
  }
  function changeTheme(theme) {
    setTimeout(() => {
      if (typeof theme === "boolean") {
        myVue.$vuetify.theme.dark = theme;
      } else {
        myVue.$vuetify.theme.dark = !myVue.$vuetify.theme.dark;
      }
    }, 0);
  }
  function changeLocale(locale) {
    myVue.$i18n.locale = locale;
  }
  function socketConnect() {
    myVue.$socket.client.connect();
  }
  function socketDisconnect() {
    myVue.$socket.client.close();
  }

  return {
    updateUserSettings,
    logOutMiddleware,
    logOut,
    changeTheme,
    changeLocale,
    socketConnect,
    socketDisconnect
  };
}
