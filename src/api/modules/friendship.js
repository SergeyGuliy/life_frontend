import { axiosWithAuth } from "@utils/axios";

const API_getYourFriends = () => axiosWithAuth.get("api/friendships/friends");

const API_getYourConnections = () =>
  axiosWithAuth.get("api/friendships/requests");

const API_sendRequest = (receiverId) =>
  axiosWithAuth.post(`api/friendships/${receiverId}/add`);

const API_acceptRequest = (receiverId) =>
  axiosWithAuth.put(`api/friendships/${receiverId}/accept`);

const API_ignoreRequest = (receiverId) =>
  axiosWithAuth.put(`api/friendships/${receiverId}/ignore`);

const API_deleteFriend = (receiverId) =>
  axiosWithAuth.delete(`api/friendships/${receiverId}/delete`);

export {
  API_getYourFriends,
  API_getYourConnections,
  API_sendRequest,
  API_acceptRequest,
  API_ignoreRequest,
  API_deleteFriend,
};
