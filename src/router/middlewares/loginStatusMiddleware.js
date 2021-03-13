import store from "../../store/index";

export default function(to, from, next) {
  if (store.state.auth.user && to.name === "Auth") {
    next({ name: "Home" });
  }
  if (!store.state.auth.user && to.name !== "Auth") {
    next({ name: "Auth" });
  } else {
    next();
  }
}
