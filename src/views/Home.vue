<template>
  <Grid>
    <template #leftCol>
      <Title :title="$t('pages.friends.yourFriendsListIsEmpty')" />
      <UsersList
        :users="friends"
        :emptyText="$t(`pages.friends.yourFriendsListIsEmpty`)"
      >
        <template #actions="{ userData }">
          <UserButton :userId="userData.userId" type="openProfile" />
          <UserButton :userId="userData.userId" type="deleteFriend" />
          <UserButton :userId="userData.userId" type="writeMessage" />
        </template>
      </UsersList>
    </template>
    <template #rightCol>
      <Title :title="$t('pages.rooms.roomsList')" />
      <RoomsController />
    </template>
  </Grid>
</template>

<script>
import { defineAsyncComponent } from "vue";

import { useUsers } from "@composable";

export default {
  name: "Home",
  setup() {
    const { friends } = useUsers();
    return { friends };
  },
  components: {
    RoomsController: defineAsyncComponent(() =>
      import("@components/elements/Rooms/RoomsController.vue")
    ),
    UsersList: defineAsyncComponent(() =>
      import("@components/elements/Users/UsersList.vue")
    ),
    UserButton: defineAsyncComponent(() =>
      import("@components/elements/Users/UserButton.vue")
    ),
  },
  data() {
    return {
      users: null,
    };
  },
};
</script>
