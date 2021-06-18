<template>
  <v-avatar color="indigo" size="40">
    <v-img
      v-if="userData.avatarSmall"
      :src="userData.avatarSmall | avatarLink"
    />
    <span v-else class="white--text">{{ getAbriature }}</span>
  </v-avatar>
</template>

<script>
export default {
  name: "UserAvatar",
  props: {
    userData: {
      required: true,
      type: Object
    }
  },
  computed: {
    getAbriature() {
      const { firstName, lastName, email } = this.userData;
      if (firstName && lastName) {
        return `${firstName[0]} ${lastName[0]}`.toUpperCase();
      } else if (firstName) {
        return `${firstName[0]}`.toUpperCase();
      } else if (lastName) {
        return `${lastName[0]}`.toUpperCase();
      } else {
        return `${email[0]}`.toUpperCase();
      }
    }
  }
};
</script>
