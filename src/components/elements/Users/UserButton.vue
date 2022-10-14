<template>
  <v-btn @click="handleClick">
    {{ getTranslation }}
  </v-btn>
</template>

<script>
import { $usersActions } from "@/composable/$usersActions";
import { api } from "@api";

const {
  writeMessage,
  addUserToFriendsList,
  deleteFromFriends,
  openUserProfile
} = $usersActions();

const supportedKeys = [
  "writeMessage",
  "addUserToFriendsList",
  "deleteFromFriends",
  "openUserProfile",
  "kickUserFromRoom",
  "setNewRoomAdmin"
];

export default {
  name: "UserButton",
  props: {
    userId: {
      type: Number,
      required: true
    },
    roomId: {
      type: [Number, null],
      default: null
    },
    type: {
      type: String,
      required: true,
      validator: val => {
        return supportedKeys.includes(val);
      }
    }
  },

  data() {
    return {
      mapTranslations: {
        writeMessage: this.$t("buttons.writeMessage"),
        addUserToFriendsList: this.$t("buttons.addToFriend"),
        deleteFromFriends: this.$t("buttons.deleteFromFriends"),
        openUserProfile: this.$t("buttons.openProfile"),
        kickUserFromRoom: this.$t("buttons.kickUser"),
        setNewRoomAdmin: this.$t("buttons.setAdmin")
      },
      mapMethods: {
        writeMessage: this.writeMessage,
        addUserToFriendsList: this.addUserToFriendsList,
        deleteFromFriends: this.deleteFromFriends,
        openUserProfile: this.openUserProfile,
        kickUserFromRoom: this.kickUserFromRoom,
        setNewRoomAdmin: this.setNewRoomAdmin
      }
    };
  },

  computed: {
    getTranslation() {
      return this.mapTranslations[this.type];
    },
    getMethod() {
      return this.mapMethods[this.type];
    }
  },

  methods: {
    handleClick() {
      this.getMethod(this.userId);
    },

    async kickUserFromRoom() {
      await api.rooms.kickUserFromRoom(this.roomId, this.userId);
    },
    async setNewRoomAdmin() {
      await api.rooms.setNewRoomAdmin(this.roomId, this.userId);
    },

    writeMessage,
    addUserToFriendsList,
    deleteFromFriends,
    openUserProfile
  }
};
</script>

<style scoped></style>
