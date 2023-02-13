import { API_deleteFriend, API_sendRequest } from "@api/friendship";

import { useBus } from "@composable/useBus";
import { useUsers } from "@composable/useUsers";
import { useRouter } from "vue-router";

export function useUsersActions() {
  const { friendsRequests } = useUsers();
  const { busEmit } = useBus();
  const router = useRouter();

  function writeMessage(userId) {
    busEmit("writeMessage", userId);
  }

  async function addToFriend(userId) {
    await API_sendRequest(userId)
      .then(() => {})
      .catch(() => {});
  }
  async function deleteFriend(userId) {
    await API_deleteFriend(userId)
      .then((data) => {
        const indexToDelete = friendsRequests.findIndex(
          (i) => i.friendshipsId === data.friendshipsId
        );
        // store.commit("friends/deleteFriend", indexToDelete);
      })
      .catch(() => {});
  }
  async function openProfile(userId) {
    await router.push({ name: "UserId", params: { id: userId } });
  }

  return {
    writeMessage,
    addToFriend,
    deleteFriend,
    openProfile,
  };
}
