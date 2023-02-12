import { computed } from "vue";
import { useStoreRooms } from "../stores/room";
import { useRoute } from "vue-router";
import { useStoreAuth } from "../stores/user";

export function useRooms() {
  const {
    roomData: storeRoomData,
    setRoomData,
    setUsersInRoom,
  } = useStoreRooms();
  const { user } = useStoreAuth();
  const route = useRoute();

  const roomData = computed({
    get() {
      return storeRoomData;
    },
    set(val) {
      setRoomData(val);
    },
  });

  const usersInRoom = computed({
    get() {
      return storeRoomData?.usersInRoom || [];
    },
    set(val) {
      setUsersInRoom(val);
    },
  });

  const roomId = computed(() => route.params.id);

  const isRoomAdmin = computed(() => user.roomCreatedId === roomId.value);

  return {
    roomData,
    usersInRoom,
    roomId,
    isRoomAdmin,
  };
}
