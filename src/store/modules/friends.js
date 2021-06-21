// eslint-disable-next-line no-unused-vars
import { FRIENDSHIP_STATUSES } from "../../assets/helpers/enums";
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
    }
  }
};
