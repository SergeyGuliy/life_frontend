<template>
  <Grid>
    <template #leftCol>
      <Title :title="$t('pages.friends.yourFriendsListIsEmpty')" />
      <UsersList
        :users="$friends"
        :emptyText="$t(`pages.friends.yourFriendsListIsEmpty`)"
      >
        <template #actions="{userData}">
          <v-btn @click="openUserProfile(userData.userId)">
            {{ $t("buttons.openProfile") }}
          </v-btn>
          <v-btn @click="deleteFromFriends(userData.userId)">
            {{ $t("buttons.deleteFromFriends") }}
          </v-btn>
          <v-btn @click="writeMessageToUser(userData.userId)">
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
import { $usersActions } from "@composable/$usersActions";
const {
  writeMessageToUser,
  openUserProfile,
  deleteFromFriends
} = $usersActions();

export default {
  name: "Home",
  components: {
    RoomsController: () => import("@components/elements/Rooms/RoomsController"),
    UsersList: () => import("@components/elements/Users/UsersList")
  },
  data() {
    return {
      users: null
    };
  },
  methods: {
    writeMessageToUser,
    openUserProfile,
    deleteFromFriends
  }
};
</script>
