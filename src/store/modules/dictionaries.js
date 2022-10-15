import Vue from "vue";
import { api } from "@api";
import { UPDATE_TIME_DELTA } from "@constants/index.js";
import store from "@/store";

const requestUsersOrders = [];

export default {
  namespaced: true,
  state: {
    users: {},
    rooms: {}
  },
  mutations: {
    setUser(state, userData) {
      IsUserExistsAndNeedToUpdate(userData.userId, () => {
        console.error("setUser = " + userData.userId);
        Vue.set(state.users, userData.userId, {
          ...userData,
          serverTime: new Date()
        });
      });
    },
    getUserById(state, userId) {
      IsUserExistsAndNeedToUpdate(userId, () => fetchUserData(userId));
    }
  },
  actions: {
    getUserById(_, userId) {
      IsUserExistsAndNeedToUpdate(userId, () => fetchUserData(userId));
    },
    async updateUserData({ commit }, userData) {
      commit("setUser", userData);
    }
  }
};

function IsUserExistsAndNeedToUpdate(userId, callback) {
  const userNotExists = !store.state.dictionaries.users[userId];

  if (userNotExists) {
    callback();
    return;
  }

  const { serverTime } = store.state.dictionaries.users[userId];

  const needToUpdate = Math.abs(serverTime - new Date()) > UPDATE_TIME_DELTA;

  if (needToUpdate) {
    callback();
    return;
  }
}

function fetchUserData(userId) {
  if (requestUsersOrders.includes(userId)) return;

  requestUsersOrders.push(userId);

  setTimeout(() => {
    api.users
      .getById(userId)
      .then(userData => {
        if (userData) {
          store.commit("dictionaries/setUser", userData);
        }
      })
      .finally(() => {
        const userIdToDelete = requestUsersOrders.findIndex(i => i === userId);
        requestUsersOrders.splice(userIdToDelete, 1);
      });
  }, 3000);
}
