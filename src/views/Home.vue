<template>
  <Grid>
    <template #leftCol>
      <Title :title="$t('pages.friends.yourFriendsListIsEmpty')" />
      <UsersList
        :users="$friends"
        :emptyText="$t(`pages.friends.yourFriendsListIsEmpty`)"
      >
        <template #actions="{userData}">
          <v-btn @click="$usersActions.openUserProfile(userData.userId)">
            {{ $t("buttons.openProfile") }}
          </v-btn>
          <v-btn @click="$usersActions.deleteFromFriends(userData.userId)">
            {{ $t("buttons.deleteFromFriends") }}
          </v-btn>
          <v-btn @click="$usersActions.writeMessageToUser(userData.userId)">
            {{ $t("buttons.writeMessage") }}
          </v-btn>
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
    RoomsController: () =>
      import("../components/components/Rooms/RoomsController"),
    UsersList: () => import("../components/components/Users/UsersList")
  },
  data() {
    return {
      users: null
    };
  }
};
</script>
