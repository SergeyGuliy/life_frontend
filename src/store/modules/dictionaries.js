import Vue from "@vue/compat";
// import { UPDATE_TIME_DELTA } from "@constants/pinia.js";
const UPDATE_TIME_DELTA = 100000;
import { store } from "@store";
import {API_getById} from "@api/users";

const requestUsersOrders = [];

export default {
  namespaced: true,
  state: {
    users: {},
    rooms: {},
  },
  mutations: {
    setUser(state, userData) {
      IsUserExistsAndNeedToUpdate(userData.userId, () => {
        Vue.set(state.users, userData.userId, {
          ...userData,
          serverTime: new Date(),
        });
      });
    },
    getUserById(state, userId) {
      IsUserExistsAndNeedToUpdate(userId, () => fetchUserData(userId));
    },
  },
};

function IsUserExistsAndNeedToUpdate(userId, callback) {
  const userNotExists = !store.state.dictionaries.users[userId];

  if (userNotExists) return callback();

  const { serverTime } = store.state.dictionaries.users[userId];
  const needToUpdate = Math.abs(serverTime - new Date()) > UPDATE_TIME_DELTA;

  if (needToUpdate) callback();
}

function fetchUserData(userId) {
  if (requestUsersOrders.includes(userId)) return;

  requestUsersOrders.push(userId);
  API_getById(userId)
    .then((userData) => {
      if (userData) store.commit("dictionaries/setUser", userData);
    })
    .finally(() => {
      const userIdToDelete = requestUsersOrders.findIndex((i) => i === userId);
      requestUsersOrders.splice(userIdToDelete, 1);
    });
}

// setInterval(() => {
//   const users = Object.values(store.state.dictionaries.users).map(
//     ({ userId }) => userId
//   );
//   console.log(users);
// }, 1000);
