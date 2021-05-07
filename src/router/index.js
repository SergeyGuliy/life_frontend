import Vue from "vue";
import VueRouter from "vue-router";
import isLoggedIn from "./middlewares/loginStatusMiddleware";

import loginStatusMiddleware from "./middlewares/loginStatusMiddleware";
import refreshTocken from "./middlewares/refreshTocken";
import isJoinedRoom from "./middlewares/isJoinedRoom";

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
      layout: "mainLayout"
    }
  },
  {
    path: "/cabinet",
    name: "Cabinet",
    component: () => import("../views/Cabinet/Cabinet"),
    meta: {
      layout: "mainLayout"
    }
  },
  {
    path: "/users",
    name: "Users",
    component: () => import("../views/Users/Users"),
    meta: {
      layout: "mainLayout"
    }
  },
  {
    path: "/users/:id",
    name: "User",
    component: () => import("../views/Users/Users"),
    meta: {
      layout: "mainLayout"
    }
  },
  {
    path: "/users/:id",
    name: "UserId",
    component: () => import("../views/Users/UserId"),
    meta: {
      layout: "mainLayout"
    }
  },
  {
    path: "/rooms",
    name: "Rooms",
    component: () => import("../views/Rooms/Rooms"),
    meta: {
      layout: "mainLayout"
    }
  },
  {
    path: "/rooms/:id",
    name: "RoomId",
    component: () => import("../views/Rooms/RoomId"),
    meta: {
      layout: "mainLayout"
    }
  },
  {
    path: "/404",
    name: "ErrorPage",
    component: () => import("../views/ErrorPage"),
    meta: {
      layout: "mainLayout"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  await refreshTocken();
  loginStatusMiddleware(to, from, next);
  isJoinedRoom(to, from, next);
});

export default router;
