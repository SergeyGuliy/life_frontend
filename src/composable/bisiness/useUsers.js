import { computed } from "vue";

import { useStoreUser, useStoreDictionaries, useStoreFriends } from "@stores";

export function useUsers() {
  const { user: myUser } = useStoreUser();
  const { users } = useStoreDictionaries();
  const { friends: friendsRequests, connects } = useStoreFriends();

  const friends = computed(() =>
    friendsRequests.map(({ friendshipReceiver, friendshipSender }) =>
      +friendshipReceiver.userId === +myUser.userId
        ? friendshipSender
        : friendshipReceiver
    )
  );

  return {
    myUser,
    users,
    friendsRequests,
    friends,
    connects,
  };
}
