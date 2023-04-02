import { LocalStorage } from "./LocalStorage";

export const LS_accessToken = new LocalStorage("accessToken");
export const LS_refreshToken = new LocalStorage("refreshToken");
export const LS_userId = new LocalStorage("userId");

export const LS_auth = {
  clear() {
    LS_accessToken.clear();
    LS_refreshToken.clear();
    LS_userId.clear();
  },
  set({ accessToken, refreshToken, userData }) {
    LS_accessToken.value = accessToken;
    LS_refreshToken.value = refreshToken;
    LS_userId.value = userData.userId;
  },
};
