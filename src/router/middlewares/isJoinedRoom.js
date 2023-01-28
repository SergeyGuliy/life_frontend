import { store } from "../../store/index";

export function isJoinedRoom(to, from, next) {
  if (store.state.user?.user?.roomJoinedId && to.name !== "RoomId") {
    next({
      name: "RoomId",
      params: { id: store.state.user?.user?.roomJoinedId },
    });
  } else {
    next();
  }
}
