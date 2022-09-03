import Vue from "vue";
import { api } from "@api";
import { UPDATE_TIME_DELTA } from "@constants/index.js";

const requestUsersOrders = [];

export default {
  namespaced: true,
  state: {
    users: {},
    rooms: {}
  },
  mutations: {
    setUser(state, userData) {
      Vue.set(state.users, userData.userId, {
        ...userData,
        serverTime: new Date()
      });
    }
  },
  actions: {
    async getUserById({ state, dispatch }, userId) {
      if (
        !state.users[userId] ||
        needToUpdate(state.users[userId].serverTime)
      ) {
        const userData = await fetchUserData(userId);
        if (userData) {
          dispatch("updateUserData", userData);
        }
      }
    },
    async updateUserData({ commit }, userData) {
      commit("setUser", userData);
    }
  }
};

function needToUpdate(serverTime) {
  return Math.abs(serverTime - new Date()) > UPDATE_TIME_DELTA;
}

async function fetchUserData(userId) {
  if (!requestUsersOrders.includes(userId)) {
    requestUsersOrders.push(userId);
    const userData = (await api.users.getById(userId)).data;
    const userIdToDelete = requestUsersOrders.findIndex(i => i === userId);
    requestUsersOrders.splice(userIdToDelete, 1);
    return userData;
  } else {
    return false;
  }
}
