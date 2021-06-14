import { api } from "../../assets/helpers/api";
import Vue from "vue";
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
        commit("setUser", data);
        Vue.prototype.$socket.connect();
      } catch (e) {
        console.log(`Error in store action 'setUserData': ${e}`);
        throw e;
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
