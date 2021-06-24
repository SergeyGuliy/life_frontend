import { ProfileSettingsParser } from "../../../../utils/parsers";
import { clearLocalStorageKeys } from "../../../../utils/localStorageKeys";
import { myVue } from "../../../../main";

export const $currentUserActions = {
  async updateUserSettings(settings) {
    await ProfileSettingsParser.pushNewUserSettings(settings);
  },
  async logOutMiddleware() {
    if (myVue.$route.name === "RoomId") {
      await myVue
        .$openModal("Promt", {
          title: myVue.$t("modals.wantLeaveRoom"),
          submit: myVue.$t("buttons.leave"),
          cancel: myVue.$t("buttons.cancel")
        })
        .then(this.logOut)
        .catch(() => {});
    } else {
      this.logOut();
    }
  },
  async logOut() {
    try {
      await myVue.$store.dispatch("auth/logOut");
    } catch (e) {
      myVue.$emit("onError", e);
    }
    clearLocalStorageKeys();
    await myVue.$router.push({ name: "Auth" });
  },
  changeTheme(theme) {
    setTimeout(() => {
      if (typeof theme === "boolean") {
        myVue.$vuetify.theme.dark = theme;
      } else {
        myVue.$vuetify.theme.dark = !myVue.$vuetify.theme.dark;
      }
    }, 0);
  },
  changeLocale(locale) {
    myVue.$i18n.locale = locale;
  }
};
