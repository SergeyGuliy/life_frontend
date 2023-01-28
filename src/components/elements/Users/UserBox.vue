<template>
  <v-card class="UserBox" v-if="userIdExists">
    <UserInfo :userData="userData" :showUserRoomInfo="showUserRoomInfo" />
    <v-card-actions>
      <slot name="actions" :userData="userDataLocal" :isYou="isYou"></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "UserBox",
  components: {
    UserInfo: defineAsyncComponent(() => import("./UserInfo.vue")),
  },
  props: {
    userData: {
      required: true,
      type: [Object, undefined],
    },
    showUserRoomInfo: {
      default: () => false,
      type: Boolean,
    },
  },
  data() {
    return {
      timestamp: new Date(),
    };
  },
  mounted() {
    setInterval(() => {
      this.timestamp = new Date();
    }, 1000);
  },
  computed: {
    isYou() {
      return this.userDataLocal?.userId === this.$user?.userId;
    },

    userIdExists() {
      return this.userData?.userId;
    },

    userDataLocal() {
      const userData = this.$f.dictGetUserById(this.userData?.userId);
      if (this.timestamp) return userData;
      return userData;
    },
  },
};
</script>
