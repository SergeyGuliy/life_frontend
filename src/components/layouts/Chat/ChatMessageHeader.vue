<template>
  <v-list-item class="pa-0">
    <v-list-item-avatar color="grey darken-3 my-0">
      <UserAvatar
        v-if="$users[message.messageSender.userId]"
        :userData="message.messageSender"
      />
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title class="d-flex justify-space-between">
        <span>{{ getChatWriterName }}</span>
        <span>{{ message.createdAt | chatDate }}</span>
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "ChatMessageHeader",

  props: {
    createdAt: {},
    isYouAuthor: {},
    messageSender: {}
  },

  computed: {
    getChatWriterName() {
      const messageSender = this.$filters.dictGetUserById(this.messageSender);

      if (messageSender) {
        return this.isYouAuthor
          ? "Me"
          : this.$filters.getUserName(messageSender);
      }
      return "";
    }
  }
};
</script>
