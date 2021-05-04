import store from "../../store/index";
import { api } from "../../assets/helpers/api";
import { myVue } from "../../main";

export default async function() {
  if (store.state.user.user) {
    return;
  }
  const userId = localStorage.getItem("userId");
  const refreshToken = localStorage.getItem("refreshToken");
  if (userId && refreshToken) {
    try {
      const { data } = await api.auth.refreshToken(userId, refreshToken);
      await store.dispatch("user/setUserData", data);
      myVue.$vuetify.theme.dark = store.state.user.user.isDarkTheme;
    } catch (e) {
      console.log(e);
    }
  }
}
