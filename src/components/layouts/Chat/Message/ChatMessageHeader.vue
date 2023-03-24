<script setup>
import { useUsers } from "@composable/useUsers";
import { computed } from "vue";

const { users } = useUsers();

const props = defineProps({
  createdAt: {},
  isYouAuthor: {},
  messageSender: {},
});

const getChatWriterName = computed(() => {
  const messageSender = this.$filters.dictGetUserById(props.messageSender);
  if (!messageSender) return "";

  return props.isYouAuthor ? "Me" : this.$filters.getUserName(messageSender);
});
</script>

<template>
  <v-list-item class="pa-0">
    <v-list-item-media color="grey darken-3 my-0">
      <UserAvatar
        v-if="users[messageSender.userId]"
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
