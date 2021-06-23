import { api } from "../../utils/api";
import { myVue } from "../../main";
import { setLocalStorageKeys } from "../../utils/localStorageKeys";

export default {
  namespaced: true,
  state: {
    user: null
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
    },
    setProfileSettings(state, settings) {
      state.user = {
        ...state.user,
        ...settings
      };
    },
    setUserSettings(state, settings) {
      state.user.userSettings = {
        ...state.user.userSettings,
        ...settings
      };
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
    async updateUserSettings({ commit }, { profileSettings, userSettings }) {
      if (profileSettings) {
        commit("setProfileSettings", profileSettings);
      }
      if (userSettings) {
        commit("setUserSettings", userSettings);
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
