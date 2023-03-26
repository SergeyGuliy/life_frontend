import { ProfileSettingsParser } from "@utils/parsers";

export function useUserSettings() {
  async function updateUserSettings(settings) {
    await ProfileSettingsParser.pushNewUserSettings(settings);
  }

  return {
    updateUserSettings,
  };
}
