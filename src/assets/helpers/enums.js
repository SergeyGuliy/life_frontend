export const MessageReceiverTypes = {
  GLOBAL: "GLOBAL",
  ROOM: "ROOM",
  PRIVATE: "PRIVATE"
};
export const MessageTypes = {
  TEXT: "TEXT",
  VOICE: "VOICE"
};

export const FriendshipStatuses = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  IGNORED: "IGNORED"
};

export const locales = [
  { title: "English", key: "en" },
  { title: "Russian", key: "ru" }
];

export const countries = ["England", "Russia", "Ukraine", "Hungary", "Italy"];

export const sounds = [
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
