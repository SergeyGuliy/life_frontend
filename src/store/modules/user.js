import { api } from "../../assets/helpers/api";
import { myVue } from "../../main";
import { setLocalStorageKeys } from "../../assets/helpers/localStorageKeys";

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
      setLocalStorageKeys({ accessToken, refreshToken, userData });
      state.user = { ...userData };
    },

    cleanUser(state) {
      state.user = null;
    },
    joinRoom(state, roomId) {
      state.user.roomJoinedId = roomId;
    },
    leaveRoom(state) {
      state.user.roomJoinedId = null;
    }
  },
  actions: {
    async setUserData({ commit }, data) {
      try {
        const { locale, isDarkTheme } = data.userData.userSettings;
        myVue.$changeTheme(isDarkTheme);
        myVue.$changeLocale(locale);
        commit("setUser", data);
        myVue.$socket.connect();
      } catch (e) {
        console.log(e);
      }
    },
    async leaveRoom({ commit }) {
      let { status } = await api.rooms.leaveRoom();
      if (status === 200) {
        commit("leaveRoom");
      }
    }
  }
};
