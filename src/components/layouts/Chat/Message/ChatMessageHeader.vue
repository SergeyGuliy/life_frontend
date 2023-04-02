<script setup>
import { computed } from "vue";

import { useUsers } from "@composable";
import { getChatDate, getUserName } from "@helpers";
import { useStoreDictionaries } from "@stores";

const { getUserById } = useStoreDictionaries();
const { users } = useUsers();

const props = defineProps({
  createdAt: {},
  isYouAuthor: {},
  messageSender: {},
});

const getChatWriterName = computed(() => {
  const messageSender = getUserById(props.messageSender);
  if (!messageSender) return "";

  return props.isYouAuthor ? "Me" : getUserName(messageSender);
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
        <span>{{ getChatDate(createdAt) }}</span>
      </v-list-item-title>
    </v-list-item-title>
  </v-list-item>
</template>
