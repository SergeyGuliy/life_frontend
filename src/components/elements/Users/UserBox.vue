<template>
  <v-card class="UserBox">
    <UserInfo
      :userData="userData?.userId | dictionariesGetUserById"
      :showUserRoomInfo="showUserRoomInfo"
    />
    <v-card-actions>
      <slot
        name="actions"
        :userData="userData.userId | dictionariesGetUserById"
      ></slot>
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
  }
};
</script>
