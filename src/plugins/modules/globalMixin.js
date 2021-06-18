import { mapActions } from "vuex";
import Vue from "vue";
import { LOCALES, COUNTRIES } from "../../assets/helpers/enums";
import { api } from "../../assets/helpers/api";
import { clearLocalStorageKeys } from "../../assets/helpers/localStorageKeys";

Vue.mixin({
  enums: {
    LOCALES,
    COUNTRIES
  },
  computed: {
    $user() {
      return this.$store.state.user?.user;
    }
  },
  methods: {
    ...mapActions("modals", ["setModal"]),

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
      api.friendship
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
    async $openUserProfile(userId) {
      await this.$router.push({ name: "User", params: { id: userId } });
    }
  }
});
