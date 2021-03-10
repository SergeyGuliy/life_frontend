import Vue from "vue";
import VueRouter from "vue-router";
import requiredAuth from "./middlewares/requiredAuth";
import isLoggedIn from "./middlewares/isLoggedIn";
import store from "../store/index";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/auth",
    name: "Auth",
    component: () => import("../views/Auth"),
    meta: {
      middleware: [isLoggedIn],
      layout: "authLayout"
    }
  },
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home"),
    meta: {
      middleware: [requiredAuth],
      layout: "mainLayout"
    }
  },
  {
    path: "/cabinet",
    name: "Cabinet",
    component: () => import("../views/Cabinet/Cabinet"),
    meta: {
      middleware: [requiredAuth],
      layout: "mainLayout"
    }
  },
  {
    path: "/users",
    name: "Users",
    component: () => import("../views/Users/Users"),
    meta: {
      middleware: [requiredAuth],
      layout: "mainLayout"
    }
  },
  {
    path: "/users/:id",
    name: "UserId",
    component: () => import("../views/Users/UserId"),
    meta: {
      middleware: [requiredAuth],
      layout: "mainLayout"
    }
  },
  {
    path: "/rooms",
    name: "Rooms",
    component: () => import("../views/Rooms/Rooms"),
    meta: {
      middleware: [requiredAuth],
      layout: "mainLayout"
    }
  },
  {
    path: "/rooms/:id",
    name: "RoomId",
    component: () => import("../views/Rooms/RoomId"),
    meta: {
      middleware: [requiredAuth],
      layout: "mainLayout"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }
  const middleware = to.meta.middleware;

  const context = {
    to,
    from,
    next,
    store
  };
  return middleware[0]({
    ...context
  });
});

export default router;
