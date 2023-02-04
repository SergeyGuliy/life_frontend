import {routes} from "../../../../router";

import {createRouter, createWebHistory} from "vue-router";
import {refreshToken} from "../../../../router/middlewares/refreshToken";
import {loginStatusMiddleware} from "../../../../router/middlewares/loginStatusMiddleware";
import {isJoinedRoom} from "../../../../router/middlewares/isJoinedRoom";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  await refreshToken(to, from, next);
  loginStatusMiddleware(to, from, next);
  isJoinedRoom(to, from, next);
});

export function installRouter(vue) {
  vue.use(router)
}
