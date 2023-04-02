import { axiosWithAuth } from "@utils/axios";

const API_changePassword = async (formData) =>
  axiosWithAuth.post("api/users-settings/change-password", formData);

const API_changeLocale = async (formData) =>
  axiosWithAuth.post("api/users-settings/change-locale", formData);

const API_changeTheme = async (formData) =>
  axiosWithAuth.post("api/users-settings/change-theme", formData);

const API_updateUserSettings = async (formData) =>
  axiosWithAuth.post("api/users-settings/update-settings", formData);

export {
  API_changePassword,
  API_changeLocale,
  API_changeTheme,
  API_updateUserSettings,
};
