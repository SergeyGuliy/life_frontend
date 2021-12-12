import { ref, computed } from "@vue/composition-api";

export function $isUserAdmin({ userData }) {
  const refUserData = ref(userData).value;

  const isRoomAdmin = computed(() => {
    return (
      typeof refUserData.roomJoinedId === "number" &&
      typeof refUserData.roomCreatedId === "number" &&
      refUserData.roomJoinedId === refUserData.roomCreatedId
    );
  });

  return {
    isRoomAdmin
  };
}
