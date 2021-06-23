import store from "../../../../store";

export const dictionariesGetUserById = user => {
  if (typeof user === "number") {
    store.dispatch("dictionaries/getUserById", user);
  } else if (typeof user === "object") {
    store.dispatch("dictionaries/updateUserData", user);
  }
  return store.state.dictionaries.users[user];
};
