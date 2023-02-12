import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useModal } from "./useModal";
import { useStoreAuth } from "../stores/user";

import { clearLocalStorageKeys } from "../utils/localStorageKeys";
import { API_refreshToken, API_registration, API_login } from "@api/auth";

export function useAuth() {
  const route = useRoute();
  const router = useRouter();
  const { setUser, cleanUser } = useStoreAuth();
  const { openModal } = useModal();

  const { t } = useI18n();

  async function logIn(authData) {
    try {
      const data = await API_login(authData);
      await setUser(data);

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

      await router.push({ name: "Home" });
    } catch (e) {
      console.log(`Error in store action 'createNewUser': ${e.message}`);
      throw e.message;
    }
  }

  async function logOut() {
    try {
      cleanUser();
      // socketDisconnect();
      await router.push({ name: "Auth" });
    } catch (e) {
      cleanUser();
    }
  }

  async function logOutMiddleware() {
    if (route.name === "RoomId") {
      await openModal("Promt", {
        title: t("modals.wantLeaveRoom"),
        submit: t("buttons.leave"),
        cancel: t("buttons.cancel"),
      })
        .then(logOut)
        .catch(() => {});
    } else {
      logOut();
    }
  }

  async function refreshToken() {
    const userId = localStorage.getItem("userId");
    const refreshToken = localStorage.getItem("refreshToken");
    if (userId && refreshToken) {
      try {
        const data = await API_refreshToken({
          userId,
          refreshToken,
        });
        await setUser(data);
      } catch (e) {
        await logOut();
        clearLocalStorageKeys();
      }
    } else {
      clearLocalStorageKeys();
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
