<template>
  <div class="UsersList">
    <template v-if="users.length">
      <UserBox
        v-for="(userData, index) in sortedUsers"
        :key="index"
        :userData="userData"
        :showUserRoomInfo="showUserRoomInfo"
      >
        <template #actions="{ userData, isYou }">
          <slot name="actions" :userData="userData" :isYou="isYou"></slot>
        </template>
      </UserBox>
    </template>
    <div class="UserBox" v-else-if="emptyText">
      <v-card-text>{{ emptyText }}</v-card-text>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "UsersList",
  props: {
    emptyText: {
      type: String,
      required: false,
    },
    users: {
      type: Array,
      default: () => [],
    },
    showUserRoomInfo: {
      default: () => false,
      type: Boolean,
    },
    sortType: {
      default: () => null,
      type: String,
    },
  },
  components: {
    UserBox: defineAsyncComponent(() => import("./UserBox.vue")),
  },
  computed: {
    sortedUsers() {
      if (this.sortType === "adminFirst") {
        return [...this.users].sort((user) =>
          user.roomCreatedId === user.roomJoinedId ? -1 : 1
        );
      }
      return this.users;
    },
  },
};
</script>
