import { myVue } from "@main";
import { api } from "@api";
import store from "../store";

export function $usersActions() {
  function writeMessage(userId) {
    myVue.$bus.emit("writeMessage", userId);
  }
  async function addToFriend(userId) {
    await api.friendship
      .sendRequest(userId)
      .then(() => {})
      .catch(() => {});
  }
  async function deleteFriend(userId) {
    await api.friendship
      .deleteFriend(userId)
      .then(data => {
        const indexToDelete = myVue.$friendsRequests.findIndex(
          i => i.friendshipsId === data.friendshipsId
        );
        store.commit("friends/deleteFriend", indexToDelete);
      })
      .catch(() => {});
  }
  async function openProfile(userId) {
    await myVue.$router.push({ name: "UserId", params: { id: userId } });
  }
  return {
    writeMessage,
    addToFriend,
    deleteFriend,
    openProfile
  };
}
