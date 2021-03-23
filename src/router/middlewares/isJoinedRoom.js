import store from "../../store/index";

export default function(to, from, next) {
  console.log('beforeEach')
  if (store.state.user?.user?.roomJoinedId && to.name !== "RoomId") {
    next({
      name: "RoomId",
      params: { id: store.state.user?.user?.roomJoinedId }
    });
  } else {
    next();
  }
}
