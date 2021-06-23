import { mapActions } from "vuex";
import Vue from "vue";
import { clearLocalStorageKeys } from "../../utils/localStorageKeys";
import { ProfileSettingsParser } from "../../utils/parsers";
Vue.mixin({
  computed: {
    $user() {
      return this.$store.state.user?.user;
    },
    $users() {
      return this.$store.state.dictionaries?.users;
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
    }
  }
});
