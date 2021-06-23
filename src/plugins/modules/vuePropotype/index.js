import Vue from "vue";
import { myVue } from "../../../main";
import { MESSAGE_RECEIVER_TYPES } from "../../../utils/enums";
const { PRIVATE } = MESSAGE_RECEIVER_TYPES;
import store from "../../../store";
import { api } from "../../../utils/api";

Vue.prototype.$chatKeys = {
  getUserChatKey(user) {
    if (typeof user === "number") {
      return `${PRIVATE}_${user}`;
    } else {
      return `${PRIVATE}_${user.userId}`;
    }
  },
  getUserIdFromChatKey(chatKey) {
    return chatKey.split("_")[1];
  },
  getTypeFromChatKey(chatKey) {
    return chatKey.split("_")[0];
  }
};

Vue.prototype.$noti = {
  error(message) {
    myVue.$notify({
      group: "foo",
      type: "error",
      title: message
    });
  },
  warning(message) {
    myVue.$notify({
      group: "foo",
      type: "warn",
      title: message
    });
  },
  success(message) {
    myVue.$notify({
      group: "foo",
      type: "success",
      title: message
    });
  },
  info(message) {
    myVue.$notify({
      group: "foo",
      type: "info",
      title: message
    });
  }
};

Vue.prototype.$usersActions = {
  writeMessageToUser(userId) {
    myVue.$bus.emit("writeMessageToUser", userId);
  },
  async addUserToFriendsList(userId) {
    await api.friendship
      .sendRequest(userId)
      .then(() => {})
      .catch(() => {});
  },
  async deleteFromFriends(userId) {
    await api.friendship
      .deleteFromFriends(userId)
      .then(({ data }) => {
        const indexToDelete = myVue.$friendsRequests.findIndex(
          i => i.friendshipsId === data.friendshipsId
        );
        store.commit("friends/deleteFriend", indexToDelete);
      })
      .catch(() => {});
  },
  async openUserProfile(userId) {
    await myVue.$router.push({ name: "UserId", params: { id: userId } });
  }
};

Vue.prototype.$dictionares = {
  async getOrUpdateUser(user) {
    if (typeof user === "number") {
      await getUserById(user);
      return store.state.dictionaries.users[user];
    } else {
      await updateUserData(user);
      return store.state.dictionaries.users[user.userId];
    }
  }
};

async function getUserById(userId) {
  await store.dispatch("dictionaries/getUserById", userId);
}
async function updateUserData(userData) {
  await store.dispatch("dictionaries/updateUserData", userData);
}
