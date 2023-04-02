import { useRouter } from "vue-router";

import { API_deleteFriend, API_sendRequest } from "@api";
import { useBus, useUsers } from "@composable";

export function useUsersActions() {
  const { friendsRequests } = useUsers();
  const { busEmit } = useBus();
  const { push } = useRouter();

  const writeMessage = (id) => busEmit("writeMessage", id);

  const addToFriend = (id) => API_sendRequest(id).catch(() => {});

  const openProfile = (id) => push({ name: "UserId", params: { id } });

  const deleteFriend = (userId) =>
    API_deleteFriend(userId)
      .then((data) => {
        const idToDelete = friendsRequests.findIndex(
          (i) => i.friendshipsId === data.friendshipsId
        );
        // store.commit("friends/deleteFriend", idToDelete);
      })
      .catch(() => {});

  return {
    writeMessage,
    addToFriend,
    deleteFriend,
    openProfile,
  };
}
