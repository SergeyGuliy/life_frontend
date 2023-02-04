import { store } from "../../../../store";

export const dictGetUserById = (user) => {
  // if (typeof user === "number") {
  //   store.commit("dictionaries/getUserById", user);
  //   return store.state.dictionaries.users[user];
  // } else if (typeof user === "object") {
  //   store.commit("dictionaries/setUser", user);
  //   return store.state.dictionaries.users[user.userId];
  // }

  return user
};
