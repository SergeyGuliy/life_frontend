<template>
  <v-btn @click="handleClick" v-if="userId">
    {{ getTranslation }}
  </v-btn>
</template>

<script>
import { $usersActions } from "@/composable/$usersActions";
import { api } from "@api";

const {
  writeMessage,
  addToFriend,
  deleteFriend,
  openProfile
} = $usersActions();

const supportedKeys = [
  "writeMessage",
  "addToFriend",
  "deleteFriend",
  "openProfile",
  "kickUser",
  "setAdmin",
  "acceptFriend",
  "ignoreFriend"
];

export default {
  name: "UserButton",
  props: {
    userId: {
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
        addToFriend: this.$t("buttons.addToFriend"),
        deleteFriend: this.$t("buttons.deleteFriend"),
        openProfile: this.$t("buttons.openProfile"),
        kickUser: this.$t("buttons.kickUser"),
        setAdmin: this.$t("buttons.setAdmin"),
        acceptFriend: this.$t("buttons.acceptFriend"),
        ignoreFriend: this.$t("buttons.ignoreFriend")
      },
      mapMethods: {
        writeMessage: this.writeMessage,
        addToFriend: this.addToFriend,
        deleteFriend: this.deleteFriend,
        openProfile: this.openProfile,
        kickUser: this.kickUser,
        setAdmin: this.setAdmin,
        acceptFriend: this.acceptFriend,
        ignoreFriend: this.ignoreFriend
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

    async kickUser() {
      await api.rooms.kickUser(this.$roomId, this.userId);
    },

    async setAdmin() {
      await api.rooms.setAdmin(this.$roomId, this.userId);
    },

    writeMessage,
    addToFriend,
    deleteFriend,
    openProfile,

    async acceptFriend(userId) {
      await api.friendship
        .acceptRequest(userId)
        .then(data => {
          const indexToDelete = this.getIndex(data.friendshipsId);
          this.$store.commit("friends/deleteConnection", indexToDelete);
          this.$store.commit("friends/addFriend", data);
        })
        .catch(() => {});
    },

    async ignoreFriend(userId) {
      await api.friendship
        .ignoreRequest(userId)
        .then(data => {
          const indexToUpdate = this.getIndex(data.friendshipsId);
          this.$store.commit("friends/updateConnection", {
            indexToUpdate,
            data
          });
        })
        .catch(() => {});
    },

    getIndex(friendshipsId) {
      return this.$connects.findIndex(i => i.friendshipsId === friendshipsId);
    }
  }
};
</script>
