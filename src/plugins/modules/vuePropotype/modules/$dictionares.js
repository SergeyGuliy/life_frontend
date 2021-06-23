import store from "../../../../store";

export const $dictionares = {
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
