import { computed } from "vue";

import { useStoreRooms, useStoreAuth } from "@stores";
import { useMyRouter } from "@composable";

export function useRooms() {
  const {
    roomData: storeRoomData,
    setRoomData,
    setUsersInRoom,
  } = useStoreRooms();
  const { user } = useStoreAuth();
  const { routeParams } = useMyRouter();

  const roomData = computed({
    get: () => storeRoomData,
    set: (val) => setRoomData(val),
  });

  const usersInRoom = computed({
    get: () => storeRoomData?.usersInRoom || [],
    set: (val) => setUsersInRoom(val),
  });

  const roomId = computed(() => routeParams.id);

  const isRoomAdmin = computed(() => user.roomCreatedId === roomId.value);

  return {
    roomData,
    usersInRoom,
    roomId,
    isRoomAdmin,
  };
}
