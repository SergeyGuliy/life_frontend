export function loginStatusMiddleware(to, from, next) {
  // if (store.state.user.user && ["Auth", "Closer"].includes(to.name)) {
  //   next({ name: "Home" });
  // }
  // if (!store.state.user.user && !["Auth", "Closer"].includes(to.name)) {
  //   next({ name: "Auth" });
  // } else {
  //   next();
  // }

  next();
}
