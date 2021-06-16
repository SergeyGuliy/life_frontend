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
  }
  get getProfileSettings() {
    return this.profileSettings;
  }
}
