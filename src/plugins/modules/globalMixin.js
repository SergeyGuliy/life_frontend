import { mapActions } from "vuex";
import Vue from "vue";
import { api } from "../../assets/helpers/api";
import { clearLocalStorageKeys } from "../../assets/helpers/localStorageKeys";
import { ProfileSettingsParser } from "../../assets/helpers/parsers";

Vue.mixin({
  computed: {
    $user() {
      return this.$store.state.user?.user;
    },
    $chats() {
      return this.$store.state.chats?.chats;
    },
    $chatTabs() {
      return Object.keys(this.$chats);
    },
    $friendsRequests() {
      return this.$store.state.friends?.friends;
    },
    $friends() {
      return this.$friendsRequests.map(i => {
        const { friendshipReceiver, friendshipSender } = i;
        return +friendshipReceiver.userId === +this.$user.userId
          ? friendshipSender
          : friendshipReceiver;
      });
    },
    $connects() {
      return this.$store.state.friends?.connects;
    }
  },
  methods: {
    ...mapActions("modals", ["setModal"]),

    async $updateUserSettings(settings) {
      await ProfileSettingsParser.pushNewUserSettings(settings);
    },
    $noti() {
      const that = this;
      return {
        error(message) {
          that.$notify({
            group: "foo",
            type: "error",
            title: message
          });
        },
        warning(message) {
          that.$notify({
            group: "foo",
            type: "warn",
            title: message
          });
        },
        success(message) {
          that.$notify({
            group: "foo",
            type: "success",
            title: message
          });
        },
        info(message) {
          that.$notify({
            group: "foo",
            type: "info",
            title: message
          });
        }
      };
    },
    async $logOutMiddleware() {
      if (this.$route.name === "RoomId") {
        await this.$openModal("Promt", {
          title: this.$t("modals.wantLeaveRoom"),
          submit: this.$t("buttons.leave"),
          cancel: this.$t("buttons.cancel")
        })
          .then(this.$logOut)
          .catch(() => {});
      } else {
        this.$logOut();
      }
    },
    async $logOut() {
      try {
        await this.$store.dispatch("auth/logOut");
      } catch (e) {
        this.$emit("onError", e);
      }
      clearLocalStorageKeys();
      await this.$router.push({ name: "Auth" });
    },
    $changeTheme(theme) {
      setTimeout(() => {
        if (typeof theme === "boolean") {
          this.$vuetify.theme.dark = theme;
        } else {
          this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        }
      }, 0);
    },
    $changeLocale(locale) {
      this.$i18n.locale = locale;
    },

    $writeMessageToUser(userId) {
      this.$bus.emit("writeMessageToUser", userId);
    },
    async $addUserToFriendsList(userId) {
      await api.friendship
        .sendRequest(userId)
        .then(() => {})
        .catch(e => {
          this.$notify({
            group: "foo",
            type: "warn",
            title: e.response.data.message
          });
        });
    },
    async $deleteFromFriends(userId) {
      await api.friendship
        .deleteFromFriends(userId)
        .then(({ data }) => {
          const indexToDelete = this.$friendsRequests.findIndex(
            i => i.friendshipsId === data.friendshipsId
          );
          this.$store.commit("friends/deleteFriend", indexToDelete);
        })
        .catch(e => {
          this.$notify({
            group: "foo",
            type: "warn",
            title: e.response.data.message
          });
        });
    },
    async $openUserProfile(userId) {
      await this.$router.push({ name: "User", params: { id: userId } });
    }
  }
});
