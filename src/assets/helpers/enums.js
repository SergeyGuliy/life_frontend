export const MESSAGE_RECEIVER_TYPES = {
  GLOBAL: "GLOBAL",
  ROOM: "ROOM",
  PRIVATE: "PRIVATE"
};
export const MESSAGES_TYPES_MAP = {
  GLOBAL: "global",
  ROOM: "room",
  PRIVATE: "private"
};
export const MESSAGE_TYPES = {
  TEXT: "TEXT",
  VOICE: "VOICE"
};

export const FRIENDSHIP_STATUSES = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  IGNORED: "IGNORED"
};

export const LOCALES = [
  { title: "English", key: "en" },
  { title: "Russian", key: "ru" }
];

export const COUNTRIES = ["England", "Russia", "Ukraine", "Hungary", "Italy"];

export const SOUNDS = [
  {
    name: "SOUNDS_1",
    sound: require("../sounds/SOUNDS_1.mp3")
  },
  {
    name: "SOUNDS_2",
    sound: require("../sounds/SOUNDS_2.mp3")
  },
  {
    name: "SOUNDS_3",
    sound: require("../sounds/SOUNDS_3.mp3")
  },
  {
    name: "SOUNDS_4",
    sound: require("../sounds/SOUNDS_4.mp3")
  },
  {
    name: "SOUNDS_5",
    sound: require("../sounds/SOUNDS_5.mp3")
  }
];
