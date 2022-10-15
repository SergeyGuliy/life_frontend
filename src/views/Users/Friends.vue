<template>
  <Grid>
    <template #leftCol>
      <Title :title="$t('pages.cabinet.profileSettings')" />
      <UsersList
        :users="$friends"
        :emptyText="$t(`pages.friends.yourFriendsListIsEmpty`)"
      >
        <template #actions="{userData}">
          <UserButton :userId="userData?.userId" type="openProfile" />
          <UserButton :userId="userData?.userId" type="deleteFriend" />
          <UserButton :userId="userData?.userId" type="writeMessage" />
        </template>
      </UsersList>
    </template>
    <template #rightCol>
      <v-tabs v-model="tabIndex" centered>
        <v-tab v-for="(tabName, index) in tabs" :key="index">
          {{ $t(`buttons.${tabName}`) }}
        </v-tab>
      </v-tabs>
      <UsersList
        v-if="activeTabList"
        :users="activeTabList"
        :emptyText="emptyText"
      >
        <template #actions="{userData}">
          <UserButton :userId="userData?.userId" type="openProfile" />
          <UserButton
            v-if="canAccept"
            :userId="userData?.userId"
            type="acceptFriend"
          />
          <UserButton
            v-if="canIgnore"
            :userId="userData?.userId"
            type="ignoreFriend"
          />
        </template>
      </UsersList>
    </template>
  </Grid>
</template>

<script>
import { FRIENDSHIP_STATUSES } from "@enums";

const connectsIncomingPending = "connectsIncomingPending";
const connectsIncomingIgnored = "connectsIncomingIgnored";
const connectsOutgoingPending = "connectsOutgoingPending";

export default {
  name: "Friends",

  components: {
    UsersList: () => import("@components/elements/Users/UsersList"),
    UserButton: () => import("@components/elements/Users/UserButton")
  },
  data() {
    return {
      tabs: [
        connectsIncomingPending,
        connectsIncomingIgnored,
        connectsOutgoingPending
      ],
      tabIndex: 0
    };
  },
  computed: {
    activeTab() {
      return this.tabs[this.tabIndex];
    },
    activeTabList() {
      return this[this.activeTab];
    },
    emptyText() {
      return this.$t(`pages.friends.${this.activeTab}`);
    },
    canAccept() {
      return [connectsIncomingPending, connectsIncomingIgnored].includes(
        this.activeTab
      );
    },
    canIgnore() {
      return [connectsIncomingPending].includes(this.activeTab);
    },

    connectsInPending() {
      return this.getConnectionsByStatus(FRIENDSHIP_STATUSES.PENDING);
    },
    connectsInIgnored() {
      return this.getConnectionsByStatus(FRIENDSHIP_STATUSES.IGNORED);
    },
    [connectsIncomingPending]() {
      return this.connectsInPending
        .filter(i => i.friendshipReceiver.userId === this.$user.userId)
        .map(i => i.friendshipSender);
    },
    [connectsOutgoingPending]() {
      return this.connectsInPending
        .filter(i => i.friendshipSender.userId === this.$user.userId)
        .map(i => i.friendshipReceiver);
    },
    [connectsIncomingIgnored]() {
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
