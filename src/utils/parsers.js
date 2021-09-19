// import {SOUNDS} from "./enums";
import { cloneDeep } from "lodash";
import { api } from "./api";
import store from "../store";

export class ProfileSettingsParser {
  constructor(userData) {
    this.profileSettings = {
      avatarBig: userData?.avatarBig || "",
      avatarSmall: userData?.avatarSmall || "",
      email: userData?.email || "",
      phone: userData?.phone || "",
      firstName: userData?.firstName || "",
      lastName: userData?.lastName || "",
      country: userData?.country || ""
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
    return cloneDeep(this.profileSettings);
  }
  get getChatSettings() {
    return cloneDeep(this.chatSettings);
  }

  static get nameMap() {
    return {
      profileSettings: {
        email: "profileSettings.email",
        phone: "profileSettings.phone",
        firstName: "profileSettings.firstName",
        lastName: "profileSettings.lastName",
        country: "profileSettings.country"
      },
      chatSettings: {
        global: {
          isTurnedOn: "userSettings.globalIsTurnedOn",
          autoplay: "userSettings.globalAutoplay",
          soundSelected: "userSettings.globalSoundSelected"
        },
        room: {
          isTurnedOn: "userSettings.roomIsTurnedOn",
          autoplay: "userSettings.roomAutoplay",
          soundSelected: "userSettings.roomSoundSelected"
        },
        private: {
          isTurnedOn: "userSettings.privateIsTurnedOn",
          autoplay: "userSettings.privateAutoplay",
          soundSelected: "userSettings.privateSoundSelected"
        }
      }
    };
  }

  static parseUserSettings(data) {
    const dataToReturn = {};
    Object.entries(data).forEach(([key1, value1]) => {
      if (this.nameMap[key1] && typeof this.nameMap[key1] === "object") {
        Object.entries(value1).forEach(([key2, value2]) => {
          if (
            this.nameMap[key1][key2] &&
            typeof this.nameMap[key1][key2] === "object"
          ) {
            Object.entries(value2).forEach(([key3]) => {
              const keys = this.nameMap[key1][key2][key3].split(".");
              dataToReturn[keys[0]] = {
                ...dataToReturn[keys[0]],
                [keys[1]]: value2[key3]
              };
            });
          }
          if (
            this.nameMap[key1][key2] &&
            typeof this.nameMap[key1][key2] === "string"
          ) {
            const keys = this.nameMap[key1][key2].split(".");
            dataToReturn[keys[0]] = {
              ...dataToReturn[keys[0]],
              [keys[1]]: value2
            };
          }
        });
      }
    });
    return dataToReturn;
  }

  static async pushNewUserSettings(data) {
    const dataToReturn = this.parseUserSettings(data);
    return await api.userSettings
      .updateUserSettings(dataToReturn)
      .then(({ data }) => {
        store.dispatch("user/updateUserSettings", data);
      })
      .catch(e => {
        console.log(e);
      });
  }
}
