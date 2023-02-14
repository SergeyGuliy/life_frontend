import { computed } from "vue";

import { useStoreAuth } from "../stores/user";
import { useStoreDictionaries } from "../stores/dictionares";
import { useStoreFriends } from "../stores/friends";

export function useUsers() {
  const { user: myUser } = useStoreAuth();
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
