import { LocalStorageService } from "../utils/localStorageService";

export const LS_accessToken = new LocalStorageService("accessToken");
export const LS_refreshToken = new LocalStorageService("refreshToken");
export const LS_userId = new LocalStorageService("userId");
export const LS_typeOfRoom = new LocalStorageService("typeOfRoom");

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
