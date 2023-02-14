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

import { useModal } from "@composable/useModal";
const { openModal } = useModal();

import { useSocket } from "@composable/useSocket";
const { onSocketInit, socketEmit } = useSocket();

import { useRooms } from "@composable/useRooms";
let { roomId, usersInRoom, roomData } = useRooms();

import { useUsers } from "@composable/useUsers";
const { myUser } = useUsers();

import { useI18n } from "vue-i18n";
const { t } = useI18n();

import { useRouter } from "vue-router";
const router = useRouter();

import { useGame } from "@composable/useGame";
const { gameId } = useGame();

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
    .catch(() => {
      this.$store.commit("user/leaveRoom");
      router.push({ name: "Home" });
    });
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
        await this.$store.dispatch("user/leaveRoomAction");
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
  let indexOldAdmin = usersInRoom.findIndex(
    (user) => typeof user.roomCreatedId === "number"
  );
  this.$store.commit("room/updateUser", {
    index: indexOldAdmin,
    userData: {
      roomCreatedId: null,
    },
  });

  let indexNewAdmin = usersInRoom.findIndex(
    (user) => user.userId === newAdmin.userId
  );
  this.$store.commit("room/updateUser", {
    index: indexNewAdmin,
    userData: {
      roomCreatedId: roomId,
    },
  });

  if (newAdmin.userId === myUser.userId) {
    this.$store.commit("user/setRoomId", roomId);
  } else {
    this.$store.commit("user/setRoomId", null);
  }
}

async function userKickedFromRoom(userId) {
  this.$store.commit("room/kickUser", userId);

  const isKickedUserMe = +myUser.userId === +userId;
  if (isKickedUserMe) {
    this.$store.commit("user/leaveRoom");
    await router.push({ name: "Home" });
  }
}

function updateToggleLockRoom(lockState) {
  roomData = { isBlocked: lockState };
}

function gameStarted(game) {
  roomData = { gameId: game._id };
  gameId.value = game._id;
}
</script>
