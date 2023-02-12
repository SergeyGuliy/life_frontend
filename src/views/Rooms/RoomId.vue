<template>
  <div style="width: 100%">
    <Room v-show="!$gameId" />
    <Game v-if="$gameId" />
  </div>
</template>

<script setup>
import { defineAsyncComponent, onBeforeMount } from "vue";
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
} from "@constants/ws/rooms";

import { useModal } from "@composable/useModal";
const { openModal } = useModal();

import { useSocket } from "@composable/useSocket";
const { onSocketInit, socketEmit } = useSocket();

import { useRooms } from "@composable/useRooms";
let { roomId, usersInRoom, roomData } = useRooms();

onBeforeMount(() => {
  API_getRoomById(roomId)
    .then((data) => {
      roomData = data;
      this.$gameId = data.gameId;

      socketEmit(rooms_userConnectsRoom, {
        userId: this.$user.userId,
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
      this.$router.push({ name: "Home" });
    });
});

onBeforeRouteLeave(async (to, from, next) => {
  if (!this.$user || +this.$user?.roomJoinedId !== roomId) {
    next();
  } else {
    await openModal("Promt", {
      title: this.$t("modals.wantLeaveRoom"),
      submit: this.$t("buttons.leave"),
      cancel: this.$t("buttons.cancel"),
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

  if (newAdmin.userId === this.$user.userId) {
    this.$store.commit("user/setRoomId", roomId);
  } else {
    this.$store.commit("user/setRoomId", null);
  }
}

async function userKickedFromRoom(userId) {
  this.$store.commit("room/kickUser", userId);

  const isKickedUserMe = +this.$user.userId === +userId;
  if (isKickedUserMe) {
    this.$store.commit("user/leaveRoom");
    await this.$router.push({ name: "Home" });
  }
}

function updateToggleLockRoom(lockState) {
  roomData = { isBlocked: lockState };
}

function gameStarted(game) {
  roomData = { gameId: game._id };
  this.$gameId = game._id;
}
</script>
