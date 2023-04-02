<script setup>
import { onBeforeMount } from "vue";
import { onBeforeRouteLeave } from "vue-router";

import RoomRoot from "@components/elements/Rooms/RoomRoot.vue";
import Game from "@components/elements/Games/Game.vue";

import { API_getRoomById } from "@api";
import {
  rooms_updateRoomAdmin,
  rooms_updateToggleLockRoom,
  rooms_updateUsersListInRoom,
  rooms_userConnectsRoom,
  rooms_userKickedFromRoom,
} from "@constants";

import {
  useModal,
  useSocket,
  useRooms,
  useUsers,
  useGame,
  useLocale,
  useMyRouter,
} from "@composable";
import { useStoreAuth, useStoreRooms } from "@stores";

const { routerPush } = useMyRouter();
const { t } = useLocale();
const { onSocketInit, socketEmit } = useSocket();
const { openModal } = useModal();
const { myUser } = useUsers();
const { gameId } = useGame();
const { leaveRoom, setRoomId, leaveRoomAction } = useStoreAuth();
const { updateUser, kickUser } = useStoreRooms();
const { roomId, usersInRoom, roomData } = useRooms();

onBeforeMount(() => {
  API_getRoomById(roomId)
    .then((data) => {
      roomData.value = data;
      gameId.value = data.gameId;

      socketEmit(rooms_userConnectsRoom, {
        userId: myUser.userId,
        roomId: roomId,
      });

      onSocketInit({
        [rooms_updateUsersListInRoom]: updateUserListInRoom,
        [rooms_updateRoomAdmin]: updateRoomAdmin,
        [rooms_userKickedFromRoom]: userKickedFromRoom,
        [rooms_updateToggleLockRoom]: updateToggleLockRoom,
        games_gameStarted: gameStarted,
      });
    })
    .catch(exitRoom);
});

onBeforeRouteLeave(async (to, from, next) => {
  if (!myUser || +myUser?.roomJoinedId !== roomId) {
    next();
  } else {
    await openModal("Promt", {
      title: t("modals.wantLeaveRoom"),
      submit: t("buttons.leave"),
      cancel: t("buttons.cancel"),
    })
      .then(async () => {
        await leaveRoomAction();
        next();
      })
      .catch((e) => {
        console.log(e);
      });
  }
});

function updateUserListInRoom(argUsersInRoom) {
  usersInRoom.value = argUsersInRoom;
}

function updateRoomAdmin(newAdmin) {
  let idOldAdmin = usersInRoom.value.findIndex(
    ({ roomCreatedId }) => typeof roomCreatedId === "number"
  );

  updateUser({
    index: idOldAdmin,
    userData: { roomCreatedId: null },
  });

  let idNewAdmin = usersInRoom.value.findIndex(
    ({ userId }) => userId === newAdmin.userId
  );

  updateUser({
    index: idNewAdmin,
    userData: { roomCreatedId: roomId },
  });

  setRoomId(newAdmin.userId === myUser.userId ? roomId : null);
}

async function userKickedFromRoom(userId) {
  kickUser(userId);
  const isKickedUserMe = +myUser.userId === +userId;

  if (isKickedUserMe) exitRoom();
}

function exitRoom() {
  leaveRoom();
  routerPush({ name: "Home" });
}

function updateToggleLockRoom(lockState) {
  roomData.value = { isBlocked: lockState };
}

function gameStarted(game) {
  roomData.value = { gameId: game._id };
  gameId.value = game._id;
}
</script>

<template>
  <div style="width: 100%">
    <RoomRoot v-show="!gameId" />
    <Game v-if="gameId" />
  </div>
</template>
