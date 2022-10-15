<template>
  <v-card class="UserBox">
    <UserInfo :userData="userData" :showUserRoomInfo="showUserRoomInfo" />
    <v-card-actions>
      <slot name="actions" :userData="userDataLocal" :isYou="isYou"></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "UserBox",
  components: {
    UserInfo: () => import("./UserInfo")
  },
  props: {
    userData: {
      required: true,
      type: [Object, undefined]
    },
    showUserRoomInfo: {
      default: () => false,
      type: Boolean
    }
  },
  computed: {
    isYou() {
      return this.userDataLocal?.userId === this.$user?.userId;
    },

    userDataLocal() {
      const userData = this.$filters.dictGetUserById(this.userData?.userId);
      return userData;
    }
  }
};
</script>
