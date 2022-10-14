<template>
  <Grid>
    <template #leftCol>
      <Title :title="$t('pages.cabinet.profileSettings')" />
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
      <v-tabs v-model="tab" centered>
        <v-tab v-for="(item, index) in tabs" :key="index">
          {{ $t(`buttons.${item}`) }}
        </v-tab>
      </v-tabs>
      <UsersList
        v-if="activeTabList"
        :users="activeTabList"
        :emptyText="activeTabListEmptyList"
      >
        <template #actions="{userData}">
          <UserButton :userId="userData.userId" type="openUserProfile" />
          <UserButton
            v-if="
              ['connectsIncomingPending', 'connectsIncomingIgnored'].includes(
                tabs[tab]
              )
            "
            :userId="userData.userId"
            type="acceptFriendRequest"
          />
          <UserButton
            v-if="['connectsIncomingPending'].includes(tabs[tab])"
            :userId="userData.userId"
            type="ignoreFriendRequest"
          />
        </template>
      </UsersList>
    </template>
  </Grid>
</template>

<script>
import { FRIENDSHIP_STATUSES } from "@enums";

export default {
  name: "Friends",

  components: {
    UsersList: () => import("@components/elements/Users/UsersList"),
    UserButton: () => import("@components/elements/Users/UserButton")
  },
  data() {
    return {
      tabs: [
        "connectsIncomingPending",
        "connectsIncomingIgnored",
        "connectsOutgoingPending"
      ],
      tab: "connectsIncomingPending"
    };
  },
  computed: {
    activeTabList() {
      return this[this.tabs[this.tab]];
    },
    activeTabListEmptyList() {
      return this.$t(`pages.friends.${this.tabs[this.tab]}`);
    },
    connectsInPending() {
      return this.getConnectionsByStatus(FRIENDSHIP_STATUSES.PENDING);
    },
    connectsInIgnored() {
      return this.getConnectionsByStatus(FRIENDSHIP_STATUSES.IGNORED);
    },
    connectsIncomingPending() {
      return this.connectsInPending
        .filter(i => i.friendshipReceiver.userId === this.$user.userId)
        .map(i => i.friendshipSender);
    },
    connectsOutgoingPending() {
      return this.connectsInPending
        .filter(i => i.friendshipSender.userId === this.$user.userId)
        .map(i => i.friendshipReceiver);
    },
    connectsIncomingIgnored() {
      return this.connectsInIgnored
        .filter(i => i.friendshipReceiver.userId === this.$user.userId)
        .map(i => i.friendshipSender);
    }
  },

  methods: {
    getConnectionsByStatus(status) {
      return this.$connects.filter(i => i.friendshipsStatus === status);
    }
  }
};
</script>
