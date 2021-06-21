<template>
  <v-list-item two-line>
    <v-list-item-avatar>
      <UserAvatar :userData="$user" />
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>{{ $user | getUserName }}</v-list-item-title>
      <v-list-item-subtitle>Logged In</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "SideBarUserBlock"
};
</script>
