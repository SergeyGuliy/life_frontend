import { axiosWithAuth } from "@utils";

const API_startGame = async (roomId, gameSettings) =>
  axiosWithAuth.post(`api/games/start`, { roomId, gameSettings });

const API_getGameById = async (gameId) =>
  axiosWithAuth.get(`api/games/${gameId}`);

const API_getInGameUserData = async (gameId) =>
  axiosWithAuth.get(`api/games/user-data/${gameId}`);

const API_userEvent = (action) =>
  axiosWithAuth.post(`api/games/user-action/`, action);

const API_getCrypto = async (body) =>
  axiosWithAuth.post(`api/games/crypto/get/`, body);

export {
  API_startGame,
  API_getGameById,
  API_getInGameUserData,
  API_userEvent,
  API_getCrypto,
};
