import { createRouter, createWebHistory } from "vue-router";

import {
  routes,
  refreshTokenMiddleware,
  loginStatusMiddleware,
  isJoinedRoom,
} from "@router";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  await refreshTokenMiddleware(to, from, next);
  loginStatusMiddleware(to, from, next);
  isJoinedRoom(to, from, next);
});

export const installRouter = (vue) => vue.use(router);
