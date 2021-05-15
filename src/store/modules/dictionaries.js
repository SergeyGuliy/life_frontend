import Vue from "vue";
import { api } from "../../assets/helpers/api";

export default {
  namespaced: true,
  state: {
    users: {},
    rooms: {}
  },
  mutations: {
    setUser(state, userData) {
      Vue.set(state.users, userData.userId, userData);
    }
  },
  getters: {
    getUsers: state => state.users
  },
  actions: {
    async getUserById({ commit, state }, userId) {
      if (!state.users[userId]) {
        const userData = (await api.users.getById(userId)).data;
        commit("setUser", userData);
      }
      return state.users[userId];
    },
    async updateUserData({ commit, state }, userData) {
      commit("setUser", userData);
      return state.users[userData.userId];
    }
  }
};
