<template>
  <div class="Friends">
    <v-row>
      <v-col cols="6">
        <UsersList :users="sortedFriends">
          <template #actions="{userData}">
            <v-btn @click="$openUserProfile(userData.userId)">
              {{ $t("btns.openProfile") }}
            </v-btn>
            <v-btn @click="deleteFromFriends(userData.userId)">
              {{ $t("btns.deleteFromFriends") }}
            </v-btn>
          </template>
        </UsersList>
      </v-col>
      <v-col cols="6">
        <v-tabs v-model="tab" dark centered>
          <v-tab v-for="(item, index) in tabs" :key="index">
            {{ $t(`btns.${item}`) }}
          </v-tab>
        </v-tabs>
        <UsersList
          v-if="activeTabList"
          :users="activeTabList"
          :emptyText="activeTabListEmptyList"
        >
          <template #actions="{userData}">
            <v-btn @click="$openUserProfile(userData.userId)">
              {{ $t("btns.openProfile") }}
            </v-btn>
            <v-btn
              @click="acceptFriendRequest(userData.userId)"
              v-if="
                ['connectsIncomingPending', 'connectsIncomingIgnored'].includes(
                  tabs[tab]
                )
              "
            >
              {{ $t("btns.acceptFriendRequest") }}
            </v-btn>
            <v-btn
              @click="ignoreFriendRequest(userData.userId)"
              v-if="['connectsIncomingPending'].includes(tabs[tab])"
            >
              {{ $t("btns.ignoreFriendRequest") }}
            </v-btn>
          </template>
        </UsersList>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { FriendshipStatuses } from "../../assets/helpers/enums";
import { api } from "../../assets/helpers/api";
import socketMixin from "../../mixins/socketMixin";

export default {
  name: "Friends",
  mixins: [socketMixin],
  components: {
    UsersList: () => import("../../components/Users/UsersList")
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
      return this.$t(`pages.rooms.${this.tabs[this.tab]}`);
    },
    activeTabList() {
      return this[this.tabs[this.tab]];
    },
    sortedFriends() {
      return this.friends.map(i => {
        const { friendshipReceiver, friendshipSender } = i;
        return +friendshipReceiver.userId === +this.$user.userId
          ? friendshipSender
          : friendshipReceiver;
      });
    },
    connectsInPending() {
      return this.connects.filter(
        i => i.friendshipsStatus === FriendshipStatuses.PENDING
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
        i => i.friendshipsStatus === FriendshipStatuses.IGNORED
      );
    },
    connectsIncomingIgnored() {
      return this.connectsInIgnored
        .filter(i => i.friendshipReceiver.userId === this.$user.userId)
        .map(i => i.friendshipSender);
    },
    connectsOutgoingIgnored() {
      return this.connectsInIgnored
        .filter(i => i.friendshipSender.userId === this.$user.userId)
        .map(i => i.friendshipReceiver);
    }
  },
  async mounted() {
    await api.friendship
      .getYourFriends()
      .then(data => {
        this.$set(this, "friends", data.data);
      })
      .catch(e => {
        console.log(e);
      });
    await api.friendship
      .getYourConnections()
      .then(data => {
        this.$set(this, "connects", data.data);
      })
      .catch(e => {
        console.log(e);
      });
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
    },
    async deleteFromFriends(userId) {
      await api.friendship
        .deleteFromFriends(userId)
        .then(data => {
          const indexToDelete = this.friends.findIndex(
            i => i.friendshipsId === data.data.friendshipsId
          );
          this.$delete(this.friends, indexToDelete);
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

<style lang="scss">
.Friends {
}
</style>
