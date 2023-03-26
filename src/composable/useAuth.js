import { useRoute } from "vue-router";

import { useStoreAuth } from "@stores";

import { clearLocalStorageKeys } from "../utils/localStorageKeys";
import { API_refreshToken, API_registration, API_login } from "@api/auth";
import { useVuetifyTheme, useLocale, useModal } from "@composable";
import { router } from "@plugins/modules/globalContext/modules/router";

export function useAuth() {
  const route = useRoute();
  // const router = useRouter();
  const { setTheme } = useVuetifyTheme();
  const { setUser, cleanUser } = useStoreAuth();
  const { openModal } = useModal();

  async function logIn(authData) {
    try {
      const data = await API_login(authData);
      await setUser(data);
      setTheme(data.userData.userSettings.isDarkTheme);
      await router.push({ name: "Home" });
    } catch (e) {
      console.log(`Error in store action 'logIn': ${e}`);
      throw e;
    }
  }

  async function registration(authData) {
    try {
      const data = await API_registration(authData);
      await setUser(data);
      setTheme(data.userData.userSettings.isDarkTheme);
      await router.push({ name: "Home" });
    } catch (e) {
      console.log(`Error in store action 'createNewUser': ${e.message}`);
      throw e.message;
    }
  }

  async function logOut(logoutRedirectRoute = "Auth") {
    clearLocalStorageKeys();
    cleanUser();
    setTheme(false);
    // socketDisconnect();
    await router.push({ name: logoutRedirectRoute });
  }

  async function logOutMiddleware() {
    const { t } = useLocale();

    if (route.name === "RoomId") {
      await openModal("Promt", {
        title: t("modals.wantLeaveRoom"),
        submit: t("buttons.leave"),
        cancel: t("buttons.cancel"),
      })
        .then(logOut)
        .catch(() => {});
    } else {
      await logOut();
    }
  }

  async function refreshToken() {
    try {
      const data = await API_refreshToken();
      await setUser(data);
      setTheme(data.userData.userSettings.isDarkTheme);
    } catch (e) {
      await logOut();
    }
  }

  return {
    logOut,
    logOutMiddleware,
    logIn,
    registration,
    refreshToken,
  };
}
