import router from "../router";
import { api } from "../assets/helpers/api";
import Vue from "vue";

export default {
  namespaced: true,
  state: {
    user: null
  },
  getters: {
    isLoggedIn: state => !!state.user
  },
  mutations: {
    setUser(state, { userData, accessToken, refreshToken }) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("userId", userData.id);
      state.user = userData;
    },

    cleanUser(state) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");
      state.user = "";
    },

    updateUserInfo(state, newUserInfo) {
      state.user.userInfo = { ...newUserInfo };
    }
  },
  actions: {
    async refreshToken({ commit, dispatch }) {
      try {
        const userId = localStorage.getItem("userId");
        const refreshToken = localStorage.getItem("refreshToken");
        if (userId && refreshToken) {
          const { data } = await api.auth.refreshToken(userId, refreshToken);
          commit("setUser", data);
        } else {
          await dispatch("logOut");
        }
      } catch (e) {
        await dispatch("logOut");
      }
    },
    async registration({ commit, state }, authData) {
      try {
        const { data } = await api.auth.registration(authData);
        commit("setUser", data);
        await router.push({ name: "Home" });
        Vue.prototype.$vuetify.theme.dark = state.user.isDarkTheme;
      } catch (e) {
        console.log(`Error in store action 'createNewUser': ${e.message}`);
        throw e.message;
      }
    },

    async logIn({ commit, state }, authData) {
      try {
        const { data } = await api.auth.login(authData);
        commit("setUser", data);
        await router.push({ name: "Home" });
        Vue.prototype.$vuetify.theme.dark = state.user.isDarkTheme;
      } catch (e) {
        console.log(`Error in store action 'logIn': ${e}`);
        throw e;
      }
    },

    async logOut({ commit }) {
      try {
        commit("cleanUser");
        await router.push({ name: "Auth" });
        // Vue.prototype.$vuetify.theme.dark = false;
      } catch (e) {
        commit("cleanUser");
      }
    }
  }
};
