// import { store } from "../../../../store";

import { useStoreDictionaries } from "../stores";

export const getUserById = (user) => {
  // const storeDictionaries = useStoreDictionaries();
  //
  // if (typeof user === "number") {
  //   storeDictionaries.commit("dictionaries/getUserById", user);
  //   return store.state.dictionaries.users[user];
  // } else if (typeof user === "object") {
  //   store.commit("dictionaries/setUser", user);
  //   return store.state.dictionaries.users[user.userId];
  // }

  return user;
};
