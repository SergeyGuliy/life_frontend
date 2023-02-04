import {api} from "../utils/api";
import {router} from "../router";
import {useStoreAuth} from "../stores/user";
import {useVuetifyTheme} from "./useVuetifyTheme";

const {setUser,cleanUser} = useStoreAuth()

export function useAuth() {
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

  return {logOut,logIn,registration}
}
