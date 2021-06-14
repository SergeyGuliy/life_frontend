import router from "../../router";
import { api } from "../../assets/helpers/api";
import Vue from "vue";
import { clearLocalStorageKeys } from "../../assets/helpers/localStorageKeys";

export default {
  namespaced: true,
  actions: {
    async refreshToken({ dispatch }) {
      const userId = localStorage.getItem("userId");
      const refreshToken = localStorage.getItem("refreshToken");
      if (userId && refreshToken) {
        try {
          const { data } = await api.auth.refreshToken(userId, refreshToken);
          await dispatch("user/setUserData", data, { root: true });
        } catch (e) {
          await dispatch("logOut");
          clearLocalStorageKeys();
        }
      } else {
        await dispatch("logOut");
        clearLocalStorageKeys();
      }
    },

    async registration({ dispatch }, authData) {
      try {
        const { data } = await api.auth.registration(authData);
        await dispatch("user/setUserData", data, { root: true });
      } catch (e) {
        console.log(`Error in store action 'createNewUser': ${e.message}`);
        throw e.message;
      }
    },

    async logIn({ dispatch }, authData) {
      try {
        const { data } = await api.auth.login(authData);
        await dispatch("user/setUserData", data, { root: true });
      } catch (e) {
        console.log(`Error in store action 'logIn': ${e}`);
        throw e;
      }
    },

    async logOut({ commit }) {
      try {
        commit("user/cleanUser", "", { root: true });
        Vue.prototype.$socket.close();
        await router.push({ name: "Auth" });
      } catch (e) {
        commit("user/cleanUser", "", { root: true });
      }
    }
  }
};
