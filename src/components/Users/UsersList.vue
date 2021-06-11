<template>
  <div class="UsersList">
    <template v-if="users.length">
      <UserBox
        v-for="(userData, index) in users"
        :key="index"
        :userData="userData"
        :showUserRoomInfo="showUserRoomInfo"
      >
        <template #actions="{userData}">
          <slot name="actions" :userData="userData"></slot>
        </template>
      </UserBox>
    </template>
    <v-card class="UserBox" v-else-if="emptyText">
      <v-card-text>{{ emptyText }}</v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "UsersList",
  props: {
    emptyText: {
      type: String,
      required: false
    },
    users: {
      type: Array,
      default: () => []
    },
    showUserRoomInfo: {
      default: () => false,
      type: Boolean
    }
  },
  components: {
    UserBox: () => import("./UserBox")
  }
};
</script>
