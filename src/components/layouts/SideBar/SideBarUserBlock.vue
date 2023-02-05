<template>
  <v-list-item two-line>
    <template v-slot:prepend>
      <UserAvatar :userData="$user" />
    </template>

    <v-list-item-title>
      <v-list-item-title>{{ $filters.getUserName($user) }}</v-list-item-title>
      <v-list-item-subtitle>Logged In</v-list-item-subtitle>
    </v-list-item-title>
  </v-list-item>
</template>

<script>
export default {
  name: "SideBarUserBlock",
};
</script>
