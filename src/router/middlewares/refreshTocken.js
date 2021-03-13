import store from "../../store/index";
import { api } from "../../assets/helpers/api";
import { myVue } from "../../main";
// import Vue from 'vue'

export default async function() {
  if (store.state.auth.user) {
    return;
  }
  const userId = localStorage.getItem("userId");
  const refreshToken = localStorage.getItem("refreshToken");
  if (userId && refreshToken) {
    try {
      const { data } = await api.auth.refreshToken(userId, refreshToken);
      await store.dispatch("auth/setUser", data);
      console.log(myVue.$vuetify.theme.dark);
    } catch (e) {
      console.log(e);
    }
  }
}
