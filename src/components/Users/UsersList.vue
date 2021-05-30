<template>
  <div class="UsersList">
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
  </div>
</template>

<script>
export default {
  name: "UsersList",
  props: {
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
