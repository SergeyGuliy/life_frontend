// import {SOUNDS} from "./enums";

export class ProfileSettingsParser {
  constructor(userData) {
    this.profileSettings = {
      avatarBig: userData?.avatarBig || "",
      avatarSmall: userData?.avatarSmall || "",
      email: userData?.email || "",
      phone: userData?.phone || "",
      firstName: userData?.firstName || "",
      lastName: userData?.lastName || "",
      country: userData?.country || "",
      locale: userData?.locale || "",
      isDarkTheme: userData?.isDarkTheme || ""
    };
    this.chatSettings = {
      global: {
        isTurnedOn: userData.userSettings.globalIsTurnedOn,
        autoplay: userData.userSettings.globalAutoplay,
        soundSelected: userData.userSettings.globalSoundSelected
      },
      room: {
        isTurnedOn: userData.userSettings.roomIsTurnedOn,
        autoplay: userData.userSettings.roomAutoplay,
        soundSelected: userData.userSettings.roomSoundSelected
      },
      private: {
        isTurnedOn: userData.userSettings.privateIsTurnedOn,
        autoplay: userData.userSettings.privateAutoplay,
        soundSelected: userData.userSettings.privateSoundSelected
      }
    };
  }
  get getProfileSettings() {
    return this.profileSettings;
  }
  get getChatSettings() {
    return this.chatSettings;
  }
}
