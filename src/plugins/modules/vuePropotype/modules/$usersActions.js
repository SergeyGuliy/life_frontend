import { myVue } from "../../../../main";
import { api } from "../../../../utils/api";
import store from "../../../../store";

export const $usersActions = {
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
