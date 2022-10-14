import store from "../../../../store";

export const dictGetUserById = user => {
  if (typeof user === "number") {
    store.dispatch("dictionaries/getUserById", user);
  } else if (typeof user === "object") {
    store.dispatch("dictionaries/updateUserData", user);
  }
  console.log(store.state.dictionaries.users[user]);
  return store.state.dictionaries.users[user];
};
