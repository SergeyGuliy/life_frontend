import { useUsers } from "@composable";

export function loginStatusMiddleware(to, from, next) {
  const { myUser } = useUsers();

  if (myUser && ["Auth", "Closer"].includes(to.name)) {
    next({ name: "Home" });
  } else if (!myUser && !["Auth", "Closer"].includes(to.name)) {
    next({ name: "Auth" });
  } else {
    next();
  }
}
