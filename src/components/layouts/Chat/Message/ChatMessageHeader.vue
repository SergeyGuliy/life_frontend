<template>
  <v-list-item class="pa-0">
    <v-list-item-media color="grey darken-3 my-0">
      <UserAvatar
        v-if="$users[messageSender.userId]"
        :userData="messageSender"
      />
    </v-list-item-media>
    <v-list-item-title>
      <v-list-item-title class="d-flex justify-space-between">
        <span>{{ getChatWriterName }}</span>
        <span>{{ $filters.chatDate(createdAt) }}</span>
      </v-list-item-title>
    </v-list-item-title>
  </v-list-item>
</template>

<script>
export default {
  name: "ChatMessageHeader",

  props: {
    createdAt: {},
    isYouAuthor: {},
    messageSender: {},
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
    },
  },
};
</script>
