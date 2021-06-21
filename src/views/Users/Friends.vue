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
          <v-btn @click="$openUserProfile(userData.userId)">
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
import { FRIENDSHIP_STATUSES } from "../../assets/helpers/enums";
import { api } from "../../assets/helpers/api";

export default {
  name: "Friends",
  components: {
    UsersList: () => import("../../components/components/Users/UsersList")
  },
  data() {
    return {
      friends: [],
      connects: [],
      tabs: [
        "connectsIncomingPending",
        "connectsIncomingIgnored",
        "connectsOutgoingPending"
      ],
      tab: "connectsIncomingPending"
    };
  },
  computed: {
    activeTabListEmptyList() {
      return this.$t(`pages.friends.${this.tabs[this.tab]}`);
    },
    activeTabList() {
      return this[this.tabs[this.tab]];
    },
    connectsInPending() {
      return this.connects.filter(
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
      return this.connects.filter(
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
        .then(data => {
          const indexToDelete = this.connects.findIndex(
            i => i.friendshipsId === data.data.friendshipsId
          );
          this.$delete(this.connects, indexToDelete);
          this.friends.push(data.data);
        })
        .catch(e => {
          this.$notify({
            group: "foo",
            type: "warn",
            title: e.response.data.message
          });
        });
    },
    async ignoreFriendRequest(userId) {
      await api.friendship
        .ignoreRequest(userId)
        .then(data => {
          const indexToUpdate = this.connects.findIndex(
            i => i.friendshipsId === data.data.friendshipsId
          );
          this.$set(this.connects, indexToUpdate, data.data);
        })
        .catch(e => {
          this.$notify({
            group: "foo",
            type: "warn",
            title: e.response.data.message
          });
        });
    }
  }
};
</script>
