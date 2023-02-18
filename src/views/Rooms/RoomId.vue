<template>
  <div style="width: 100%">
    <Room v-show="!gameId" />
    <Game v-if="gameId" />
  </div>
</template>

<script setup>
import { onBeforeMount } from "vue";
import { onBeforeRouteLeave } from "vue-router";

import Room from "@components/elements/Rooms/Room.vue";
import Game from "@components/elements/Games/Game.vue";

import { API_getRoomById } from "@api/rooms";
import {
  rooms_updateRoomAdmin,
  rooms_updateToggleLockRoom,
  rooms_updateUsersListInRoom,
  rooms_userConnectsRoom,
  rooms_userKickedFromRoom,
} from "@constants/ws/rooms.mjs";

import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useModal } from "@composable/useModal";
import { useSocket } from "@composable/useSocket";
import { useRooms } from "@composable/useRooms";
import { useUsers } from "@composable/useUsers";
import { useGame } from "@composable/useGame";
import { useStoreAuth } from "@stores/user";
import { useStoreRooms } from "@stores/room";
import { i18n } from "../../plugins/modules/globalContext/modules/i18n";

const router = useRouter();
const { t } = i18n.global;
const { onSocketInit, socketEmit } = useSocket();
const { openModal } = useModal();

const { myUser } = useUsers();
const { gameId } = useGame();
const { leaveRoom, setRoomId, leaveRoomAction } = useStoreAuth();
const { updateUser, kickUser } = useStoreRooms();
let { roomId, usersInRoom, roomData } = useRooms();

onBeforeMount(() => {
  API_getRoomById(roomId)
    .then((data) => {
      roomData = data;
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
  usersInRoom = argUsersInRoom;
}

function updateRoomAdmin(newAdmin) {
  let oldAdminId = usersInRoom.findIndex(
    ({ roomCreatedId }) => typeof roomCreatedId === "number"
  );

  updateUser({
    index: oldAdminId,
    userData: {
      roomCreatedId: null,
    },
  });

  let indexNewAdmin = usersInRoom.findIndex(
    ({ userId }) => userId === newAdmin.userId
  );

  updateUser({
    index: indexNewAdmin,
    userData: {
      roomCreatedId: roomId,
    },
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
  router.push({ name: "Home" });
}

function updateToggleLockRoom(lockState) {
  roomData = { isBlocked: lockState };
}

function gameStarted(game) {
  roomData = { gameId: game._id };
  gameId.value = game._id;
}
</script>
