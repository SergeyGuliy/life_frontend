// import router from "../router";

export default {
  namespaced: true,
  state: {
    user: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },

    cleanUser(state) {
      state.user = "";
    },

    updateUserInfo(state, newUserInfo) {
      state.user.userInfo = { ...newUserInfo };
    }
  },
  actions: {
    // async fetchUserInfo({ commit, dispatch }, uid) {
    //   console.log("ssss");
    //   try {
    //     commit("setUser", {
    //       id: userInfo.id,
    //       isAdmin: userInfo.isAdmin,
    //       profile: userInfo.profile,
    //       userInfo: userInfo.userInfo,
    //       themeDark: userInfo.themeDark
    //     });
    //   } catch (e) {
    //     console.log(`Error in store action 'fetchUserInfo': ${e}`);
    //     await dispatch("logOut");
    //   }
    // },
    // async createNewUser({ dispatch }, data) {
    //   try {
    //     await firebase
    //       .auth()
    //       .createUserWithEmailAndPassword(data.email, data.password);
    //     const uid = await (await firebase.auth().currentUser).uid;
    //     await firebase
    //       .database()
    //       .ref(`/1_users/${uid}`)
    //       .set({
    //         id: uid,
    //         profile: data.email.split("@")[0],
    //         themeDark: true
    //       });
    //     console.log(uid);
    //     await dispatch("fetchUserInfo", uid);
    //     await router.push({ name: "Main" });
    //   } catch (e) {
    //     console.log(`Error in store action 'createNewUser': ${e.message}`);
    //     throw e.message;
    //   }
    // },
    //
    // async logIn({ dispatch }, data) {
    //   try {
    //     await firebase
    //       .auth()
    //       .signInWithEmailAndPassword(data.email, data.password);
    //     const uid = await (await firebase.auth().currentUser).uid;
    //     console.log(uid);
    //     await dispatch("fetchUserInfo", uid);
    //     await router.push({ name: "Main" });
    //   } catch (e) {
    //     console.log(`Error in store action 'logIn': ${e}`);
    //     throw e;
    //   }
    // },
    //
    // async logOut({ commit }) {
    //   try {
    //     await firebase.auth().signOut();
    //     commit("cleanUser");
    //     await router.push({ name: "Auth" });
    //   } catch (e) {
    //     commit("cleanUser");
    //   }
    // }
  }
};
