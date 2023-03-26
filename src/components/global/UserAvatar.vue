<script setup>
import { computed } from "vue";

import { getAvatarLink } from "@helpers";

const props = defineProps({
  userData: { required: true },
});

const getAbs = computed(() => {
  if (!props.userData) return "";

  const { firstName, lastName, email } = props.userData;

  if (firstName && lastName) {
    return `${firstName[0]} ${lastName[0]}`.toUpperCase();
  } else if (firstName) {
    return `${firstName[0]}`.toUpperCase();
  } else if (lastName) {
    return `${lastName[0]}`.toUpperCase();
  } else {
    return `${email[0]}`.toUpperCase();
  }
});
</script>

<template>
  <v-avatar color="indigo" size="40">
    <v-img
      v-if="userData && userData.avatarSmall"
      :src="getAvatarLink(userData.avatarSmall)"
    />
    <span v-else class="white--text">{{ getAbs }}</span>
  </v-avatar>
</template>
