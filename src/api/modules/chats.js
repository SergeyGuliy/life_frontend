import { axiosWithAuth } from "../axios";

const API_getGlobalMessages = async () => axiosWithAuth.get("api/chats/global");

const API_getRoomMessages = async () => axiosWithAuth.get(`api/chats/room`);

const API_getPrivateMessages = async () =>
  axiosWithAuth.get(`api/chats/private`);

export { API_getGlobalMessages, API_getRoomMessages, API_getPrivateMessages };
