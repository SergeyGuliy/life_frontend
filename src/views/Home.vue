<template>
  <Grid>
    <template #leftCol>
      <Title :title="$t('pages.friends.yourFriendsListIsEmpty')" />
      <UsersList
        :users="$friends"
        :emptyText="$t(`pages.friends.yourFriendsListIsEmpty`)"
      >
        <template #actions="{userData}">
          <UserButton :userId="userData.userId" type="openUserProfile" />
          <UserButton :userId="userData.userId" type="deleteFromFriends" />
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
export default {
  name: "Home",
  components: {
    RoomsController: () => import("@components/elements/Rooms/RoomsController"),
    UsersList: () => import("@components/elements/Users/UsersList"),
    UserButton: () => import("@components/elements/Users/UserButton")
  },
  data() {
    return {
      users: null
    };
  }
};
</script>
