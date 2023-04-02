import { ProfileSettingsParser } from "@utils/profileSettingsParser";

export function useUserSettings() {
  async function updateUserSettings(settings) {
    await ProfileSettingsParser.pushNewUserSettings(settings);
  }

  return {
    updateUserSettings,
  };
}
