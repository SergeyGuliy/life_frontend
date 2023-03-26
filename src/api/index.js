export { API_login, API_refreshToken, API_registration } from "./modules/auth";
export {
  API_getRoomMessages,
  API_getGlobalMessages,
  API_getPrivateMessages,
} from "./modules/chats";
export {
  API_deleteFriend,
  API_acceptRequest,
  API_getYourConnections,
  API_getYourFriends,
  API_ignoreRequest,
  API_sendRequest,
} from "./modules/friendship";
export {
  API_getCrypto,
  API_getGameById,
  API_getInGameUserData,
  API_startGame,
  API_userEvent,
} from "./modules/games";
export {
  API_create,
  API_deleteRoom,
  API_getRoomById,
  API_joinRoom,
  API_leaveRoom,
  API_kickUser,
  API_toggleLockRoom,
  API_setAdmin,
  API_getRooms,
} from "./modules/rooms";
export { API_uploadAvatar, API_uploadVoice } from "./modules/uploader";
export { API_getById } from "./modules/users";
export {
  API_changePassword,
  API_changeLocale,
  API_changeTheme,
  API_updateUserSettings,
} from "./modules/userSettings";
