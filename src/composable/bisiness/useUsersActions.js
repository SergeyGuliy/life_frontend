import { useRouter } from "vue-router";

import { API_deleteFriend, API_sendRequest } from "@api";
import { useBus, useUsers } from "@composable";
import { useStoreFriends } from "@stores";

export function useUsersActions() {
  const { friendsRequests } = useUsers();
  const { busEmit } = useBus();
  const { push } = useRouter();
  const storeFriends = useStoreFriends();

  const writeMessage = (id) => busEmit("writeMessage", id);

  const addToFriend = (id) => API_sendRequest(id).catch(() => {});

  const openProfile = (id) => push({ name: "UserId", params: { id } });

  const deleteFriend = (userId) =>
    API_deleteFriend(userId)
      .then(({ friendshipsId: serverId }) => {
        const idToDelete = friendsRequests.findIndex(
          ({ friendshipsId: clientId }) => clientId === serverId
        );
        storeFriends.deleteFriend(idToDelete);
      })
      .catch(() => {});

  return {
    writeMessage,
    addToFriend,
    deleteFriend,
    openProfile,
  };
}
