export default function({ next, store }) {
  if (store.getters["auth/isLoggedIn"]) {
    return next({
      name: "Home"
    });
  }
  return next();
}
