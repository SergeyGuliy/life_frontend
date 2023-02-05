import {api} from "../utils/api";
import {useStoreAuth} from "../stores/user";
import {useRoute, useRouter} from "vue-router";


export function useAuth() {
  const route = useRoute()
  const router = useRouter()
  const {setUser,cleanUser} = useStoreAuth()

  async function logIn(authData) {
    try {
      const data = await api.auth.login(authData);
      await setUser(data);

      await router.push({name: "Home"});
    } catch (e) {
      console.log(`Error in store action 'logIn': ${e}`);
      throw e;
    }
  }

  async function registration(authData) {
    try {
      const data = await api.auth.registration(authData);
      await setUser(data);

      await router.push({name: "Home"});
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

  return {logOut,logOutMiddleware,logIn,registration}
}
