<script setup>
import { computed } from "vue";

import { useUsersActions } from "@composable/useUsersActions";
import { useRooms } from "@composable/useRooms";
import { useUsers } from "@composable/useUsers";
import { useStoreFriends } from "@stores/friends";
import { i18n } from "@plugins/modules/globalContext/modules/i18n";

import { API_acceptRequest, API_ignoreRequest } from "@api/friendship";
import { API_kickUser, API_setAdmin } from "@api/rooms";

const { roomId } = useRooms();
const { connects } = useUsers();
const { t } = i18n.global;
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

const props = defineProps({
  userId: {
    type: [Number, null],
    default: null,
  },
  type: {
    type: String,
    required: true,
    validator: (val) => {
      return supportedKeys.includes(val);
    },
  },
});

const getTranslation = computed(() => mapTranslations[props.type]);
const handleClick = () => mapMethods[props.type](props.userId);

async function kickUser() {
  await API_kickUser(roomId, props.userId);
}

async function setAdmin() {
  await API_setAdmin(roomId, props.userId);
}

async function acceptFriend(userId) {
  await API_acceptRequest(userId)
    .then((data) => {
      const indexToDelete = getIndex(data.friendshipsId);
      deleteConnection(indexToDelete);
      addFriend(data);
    })
    .catch(() => {});
}

async function ignoreFriend(userId) {
  await API_ignoreRequest(userId)
    .then((data) => {
      const indexToUpdate = getIndex(data.friendshipsId);
      updateConnection({ indexToUpdate, data });
    })
    .catch(() => {});
}

const getIndex = (friendshipsId) =>
  connects.findIndex((i) => i.friendshipsId === friendshipsId);
</script>

<template>
  <v-btn @click="handleClick" v-if="userId">
    {{ getTranslation }}
  </v-btn>
</template>
