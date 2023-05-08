import { useVuetifyTheme, useLocale, useModal, useMyRouter } from "@composable";
import { useStoreUser } from "@stores";

import { LS_auth } from "@helpers";
import { API_refreshToken, API_registration, API_login } from "@api";

export function useAuth() {
  const { setTheme } = useVuetifyTheme();
  const { setUser, cleanUser } = useStoreUser();

  const logIn = (authData) =>
    API_login(authData)
      .then((data) => {
        setUser(data);
        setTheme(data.userData.userSettings.isDarkTheme);
        useMyRouter().routerPush({ name: "Home" });
      })
      .catch((e) => {
        console.log(`Error in store action 'logIn': ${e}`);
        throw e;
      });

  const registration = (authData) =>
    API_registration(authData)
      .then(async (data) => {
        setUser(data);
        setTheme(data.userData.userSettings.isDarkTheme);
        await useMyRouter().routerPush({ name: "Home" });
      })
      .catch((e) => {
        console.log(`Error in store action 'createNewUser': ${e.message}`);
        throw e.message;
      });

  const logOut = (logoutRedirectRoute = "Auth") => {
    LS_auth.clear();
    cleanUser();
    setTheme(false);
    // socketDisconnect();
    useMyRouter().routerPush({ name: logoutRedirectRoute });
  };

  const logOutMiddleware = () => {
    const { t } = useLocale();

    if (useMyRouter().routeName() !== "RoomId") return logOut();

    return useModal()
      .openModal("Promt", {
        title: t("modals.wantLeaveRoom"),
        submit: t("buttons.leave"),
        cancel: t("buttons.cancel"),
      })
      .then(logOut)
      .catch(() => {});
  };

  const refreshToken = () => {
    return API_refreshToken()
      .then(async (data) => {
        setUser(data);
        setTheme(data.userData.userSettings.isDarkTheme);
      })
      .catch(logOut);
  };

  return {
    logOut,
    logOutMiddleware,
    logIn,
    registration,
    refreshToken,
  };
}
