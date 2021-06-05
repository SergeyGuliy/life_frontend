import { mapActions } from "vuex";
import Vue from "vue";
import { locales, countries } from "../../assets/helpers/enums";

Vue.mixin({
  data() {
    return {};
  },
  enums: {
    locales,
    countries
  },
  computed: {
    $user() {
      return this.$store.state.user?.user;
    }
  },
  methods: {
    ...mapActions("modals", ["setModal"]),

    async $logOutMiddleware() {
      if (this.$route.name === "RoomId") {
        await this.$openModal("Promt", {
          title: this.$t("modals.wantLeaveRoom"),
          submit: this.$t("btns.leave"),
          cancel: this.$t("btns.cancel")
        })
          .then(this.$logOut)
          .catch(e => {
            console.log(e);
          });
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
    },
    async $changeTheme() {
      try {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      } catch (e) {
        console.log(`Error while trying to change theme: ${e}`);
      }
    },
    $writeMessageToUser(userId) {
      this.$bus.emit("writeMessageToUser", userId);
    },
    $addUserToFriendsList(userId) {
      console.log(userId);
    },
    $openUserProfile(userId) {
      console.log(userId);
    }
  }
});
