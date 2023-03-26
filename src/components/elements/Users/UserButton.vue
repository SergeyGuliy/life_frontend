<script setup>
import { computed } from "vue";

import { useUsersActions, useRooms, useUsers, useLocale } from "@composable";
import { useStoreFriends } from "@stores";

import {
  API_acceptRequest,
  API_ignoreRequest,
  API_kickUser,
  API_setAdmin,
} from "@api";

const { roomId } = useRooms();
const { connects } = useUsers();
const { t } = useLocale();
const { deleteConnection, addFriend, updateConnection } = useStoreFriends();
const { writeMessage, addToFriend, deleteFriend, openProfile } =
  useUsersActions();

const supportedKeys = [
  "writeMessage",
  "addToFriend",
  "deleteFriend",
  "openProfile",
  "kickUser",
  "setAdmin",
  "acceptFriend",
  "ignoreFriend",
];

const props = defineProps({
  userId: { type: [Number, null], default: null },
  type: {
    type: String,
    required: true,
    validator: (val) => supportedKeys.includes(val),
  },
});

const getTranslation = computed(() => mapTranslations[props.type]);

const kickUser = () => API_kickUser(roomId, props.userId);
const setAdmin = () => API_setAdmin(roomId, props.userId);
const getIndex = (friendshipsId) =>
  connects.findIndex((i) => i.friendshipsId === friendshipsId);
const acceptFriend = (userId) =>
  API_acceptRequest(userId)
    .then((data) => {
      deleteConnection(getIndex(data.friendshipsId));
      addFriend(data);
    })
    .catch(() => {});

const ignoreFriend = (userId) =>
  API_ignoreRequest(userId)
    .then((data) =>
      updateConnection({ indexToUpdate: getIndex(data.friendshipsId), data })
    )
    .catch(() => {});

const mapTranslations = {
  writeMessage: t("buttons.writeMessage"),
  addToFriend: t("buttons.addToFriend"),
  deleteFriend: t("buttons.deleteFriend"),
  openProfile: t("buttons.openProfile"),
  kickUser: t("buttons.kickUser"),
  setAdmin: t("buttons.setAdmin"),
  acceptFriend: t("buttons.acceptFriend"),
  ignoreFriend: t("buttons.ignoreFriend"),
};
const mapMethods = {
  writeMessage: writeMessage,
  addToFriend: addToFriend,
  deleteFriend: deleteFriend,
  openProfile: openProfile,
  kickUser: kickUser,
  setAdmin: setAdmin,
  acceptFriend: acceptFriend,
  ignoreFriend: ignoreFriend,
};

const handleClick = () => mapMethods[props.type](props.userId);
</script>

<template>
  <v-btn @click="handleClick" v-if="userId">
    {{ getTranslation }}
  </v-btn>
</template>
