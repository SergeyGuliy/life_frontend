<template>
  <Grid>
    <template #leftCol>
      <Title :title="$t('pages.cabinet.profileSettings')" />
      <UsersList
        :users="$friends"
        :emptyText="$t(`pages.friends.yourFriendsListIsEmpty`)"
      >
        <template #actions="{userData}">
          <v-btn @click="$openUserProfile(userData.userId)">
            {{ $t("buttons.openProfile") }}
          </v-btn>
          <v-btn @click="$deleteFromFriends(userData.userId)">
            {{ $t("buttons.deleteFromFriends") }}
          </v-btn>
          <v-btn @click="$writeMessageToUser(userData.userId)">
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
