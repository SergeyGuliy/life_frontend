import router from "../../router";
import { api } from "../../assets/helpers/api";
// import { myVue } from "../../main";

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
      localStorage.setItem("userId", userData.userId);
      state.user = userData;
    },

    cleanUser(state) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");
      state.user = null;
    }
  },
  actions: {
    async refreshToken({ commit, dispatch }) {
      const userId = localStorage.getItem("userId");
      const refreshToken = localStorage.getItem("refreshToken");
      if (userId && refreshToken) {
        try {
          const { data } = await api.auth.refreshToken(userId, refreshToken);
          commit("setUser", data);
        } catch (e) {
          await dispatch("logOut");
        }
        // await dispatch("webSocket/socketConnect", "", { root: true });
      } else {
        await dispatch("logOut");
      }
      // await dispatch("logOut");
    },

    async setUserData({ commit, dispatch }, data) {
      try {
        commit("setUser", data);
        await dispatch("webSocket/socketConnect", "", { root: true });
        // myVue.prototype.$vuetify.theme.dark = state.user.isDarkTheme;
        await router.push({ name: "Home" });
      } catch (e) {
        console.log(`Error in store action 'logIn': ${e}`);
        throw e;
      }
    },

    async registration({ dispatch }, authData) {
      try {
        const { data } = await api.auth.registration(authData);
        await dispatch("setUserData", data);
      } catch (e) {
        console.log(`Error in store action 'createNewUser': ${e.message}`);
        throw e.message;
      }
    },

    async logIn({ dispatch }, authData) {
      try {
        const { data } = await api.auth.login(authData);
        await dispatch("setUserData", data);
      } catch (e) {
        console.log(`Error in store action 'logIn': ${e}`);
        throw e;
      }
    },

    setUser({ commit }, data) {
      commit("setUser", data);
    },

    async logOut({ commit }) {
      try {
        commit("cleanUser");
        // await dispatch("webSocket/socketDisconnect", "", { root: true });
        await router.push({ name: "Auth" });
        // myVue.prototype.$vuetify.theme.dark = false;
      } catch (e) {
        commit("cleanUser");
      }
    }
  }
};
