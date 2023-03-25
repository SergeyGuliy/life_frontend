import { useUsers } from "@composable";

export function isJoinedRoom(to, from, next) {
  const { myUser } = useUsers();

  if (myUser?.roomJoinedId && to.name !== "RoomId") {
    next({
      name: "RoomId",
      params: { id: myUser?.roomJoinedId },
    });
  } else {
    next();
  }
}
