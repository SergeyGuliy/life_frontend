import { axiosWithAuth } from "../axios";

const API_getRooms = async (params) =>
  axiosWithAuth.get("api/rooms/", { params });

const API_getRoomById = async (roomId) =>
  axiosWithAuth.get(`api/rooms/${roomId}`);

const API_create = async (formData) =>
  axiosWithAuth.post("api/rooms/create", formData);

const API_leaveRoom = async () => axiosWithAuth.patch("api/rooms/leave");

const API_joinRoom = async (roomId, roomPassword = "") =>
  axiosWithAuth.patch(`api/rooms/${roomId}/join`, { roomPassword });

const API_kickUser = async (roomId, kickUserId) =>
  axiosWithAuth.patch(`api/rooms/${roomId}/kick-user`, { kickUserId });

const API_setAdmin = async (roomId, newAdminId) =>
  axiosWithAuth.patch(`api/rooms/${roomId}/set-new-admin`, { newAdminId });

const API_toggleLockRoom = async (roomId, formData) =>
  axiosWithAuth.patch(`api/rooms/${roomId}/toggle-lock-room`, formData);

const API_deleteRoom = async (roomId) =>
  axiosWithAuth.delete(`api/rooms/${roomId}/delete-room`);

export {
  API_getRooms,
  API_getRoomById,
  API_create,
  API_leaveRoom,
  API_joinRoom,
  API_kickUser,
  API_setAdmin,
  API_toggleLockRoom,
  API_deleteRoom,
};
