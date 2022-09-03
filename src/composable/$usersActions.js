import { myVue } from "@main";
import { api } from "@api";
import store from "../store";

export function $usersActions() {
  function writeMessageToUser(userId) {
    myVue.$bus.emit("writeMessageToUser", userId);
  }
  async function addUserToFriendsList(userId) {
    await api.friendship
      .sendRequest(userId)
      .then(() => {})
      .catch(() => {});
  }
  async function deleteFromFriends(userId) {
    await api.friendship
      .deleteFromFriends(userId)
      .then(({ data }) => {
        const indexToDelete = myVue.$friendsRequests.findIndex(
          i => i.friendshipsId === data.friendshipsId
        );
        store.commit("friends/deleteFriend", indexToDelete);
      })
      .catch(() => {});
  }
  async function openUserProfile(userId) {
    await myVue.$router.push({ name: "UserId", params: { id: userId } });
  }
  return {
    writeMessageToUser,
    addUserToFriendsList,
    deleteFromFriends,
    openUserProfile
  };
}
