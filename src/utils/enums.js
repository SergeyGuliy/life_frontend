import { SOUNDS } from "@enums";

export const SOUNDS_WITH_FILES = Object.keys(SOUNDS).map((soundName) => {
  return {
    name: "soundName",
    sound: import(`../assets/sounds/${soundName}.mp3`),
  };
});
