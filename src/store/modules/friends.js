// eslint-disable-next-line no-unused-vars
import { FRIENDSHIP_STATUSES } from "@enums";
import Vue from "vue";

export default {
  namespaced: true,
  state: {
    friends: [],
    connects: []
  },
  mutations: {
    setFriends(state, friends) {
      Vue.set(state, "friends", friends);
    },
    setConnections(state, connects) {
      Vue.set(state, "connects", connects);
    },
    addFriend(state, friend) {
      state.friends.push(friend);
    },
    deleteConnection(state, indexToDelete) {
      Vue.delete(state.connects, indexToDelete);
    },
    updateConnection(state, { indexToUpdate, data }) {
      Vue.set(state.connects, indexToUpdate, data);
    },
    deleteFriend(state, indexToDelete) {
      Vue.delete(state.friends, indexToDelete);
    }
  }
};
