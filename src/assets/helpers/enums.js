export const MESSAGE_RECEIVER_TYPES = {
  GLOBAL: "GLOBAL",
  ROOM: "ROOM",
  PRIVATE: "PRIVATE"
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
    name: "message_1",
    sound: require("../sounds/message_1.mp3")
  },
  {
    name: "message_2",
    sound: require("../sounds/message_2.mp3")
  },
  {
    name: "message_3",
    sound: require("../sounds/message_3.mp3")
  },
  {
    name: "message_4",
    sound: require("../sounds/message_4.mp3")
  },
  {
    name: "message_5",
    sound: require("../sounds/message_5.mp3")
  }
];
