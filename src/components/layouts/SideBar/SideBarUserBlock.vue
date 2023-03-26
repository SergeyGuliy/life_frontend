<script setup>
import { useUsers } from "@composable";
import { getUserName } from "@helpers";

const { myUser } = useUsers();
</script>

<template>
  <v-list-item two-line>
    <template v-slot:prepend>
      <UserAvatar :userData="myUser" />
    </template>

    <v-list-item-title>
      <v-list-item-title>{{ getUserName(myUser) }}</v-list-item-title>
      <v-list-item-subtitle>Logged In</v-list-item-subtitle>
    </v-list-item-title>
  </v-list-item>
</template>
