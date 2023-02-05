export const clearLocalStorageKeys = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userId");
};

export const setLocalStorageKeys = ({
  accessToken,
  refreshToken,
  userData,
}) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("userId", userData.userId);
};
