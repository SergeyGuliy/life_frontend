<template>
  <Grid>
    <template #leftCol>
      <Title :title="$t('pages.cabinet.profileSettings')" />
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
          <v-btn @click="openUserProfile(userData.userId)">
            {{ $t("buttons.openProfile") }}
          </v-btn>
          <v-btn
            @click="acceptFriendRequest(userData.userId)"
            v-if="
              ['connectsIncomingPending', 'connectsIncomingIgnored'].includes(
                tabs[tab]
              )
            "
          >
            {{ $t("buttons.acceptFriendRequest") }}
          </v-btn>
          <v-btn
            @click="ignoreFriendRequest(userData.userId)"
            v-if="['connectsIncomingPending'].includes(tabs[tab])"
          >
            {{ $t("buttons.ignoreFriendRequest") }}
          </v-btn>
        </template>
      </UsersList>
    </template>
  </Grid>
</template>

<script>
import { FRIENDSHIP_STATUSES } from "../../utils/enums";
import { api } from "../../utils/api";
import {$usersActions} from "../../composable/$usersActions";

export default {
  name: "Friends",
  setup() {
    return $usersActions();
  },
  components: {
    UsersList: () => import("../../components/components/Users/UsersList")
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
      return this.$connects.filter(
        i => i.friendshipsStatus === FRIENDSHIP_STATUSES.PENDING
      );
    },
    connectsIncomingPending() {
      return this.connectsInPending
        .filter(i => {
          return i.friendshipReceiver.userId === this.$user.userId;
        })
        .map(i => i.friendshipSender);
    },
    connectsOutgoingPending() {
      return this.connectsInPending
        .filter(i => i.friendshipSender.userId === this.$user.userId)
        .map(i => i.friendshipReceiver);
    },
    connectsInIgnored() {
      return this.$connects.filter(
        i => i.friendshipsStatus === FRIENDSHIP_STATUSES.IGNORED
      );
    },
    connectsIncomingIgnored() {
      return this.connectsInIgnored
        .filter(i => i.friendshipReceiver.userId === this.$user.userId)
        .map(i => i.friendshipSender);
    }
  },
  methods: {
    async acceptFriendRequest(userId) {
      await api.friendship
        .acceptRequest(userId)
        .then(({ data }) => {
          const indexToDelete = this.$connects.findIndex(
            i => i.friendshipsId === data.friendshipsId
          );
          this.$store.commit("friends/deleteConnection", indexToDelete);
          this.$store.commit("friends/addFriend", data);
        })
        .catch(() => {});
    },
    async ignoreFriendRequest(userId) {
      await api.friendship
        .ignoreRequest(userId)
        .then(({ data }) => {
          const indexToUpdate = this.$connects.findIndex(
            i => i.friendshipsId === data.friendshipsId
          );
          this.$store.commit("friends/updateConnection", {
            indexToUpdate,
            data
          });
        })
        .catch(() => {});
    }
  }
};
</script>
