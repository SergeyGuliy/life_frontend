<template>
  <div class="my-wrapper">
    <SideBar :value="drawer" @updateDrawer="updateDrawer" />
    <NavBar :value="drawer" @updateDrawer="updateDrawer" />
    <v-main>
      <v-container>
        <slot />
      </v-container>
      <Chat v-if="$route.name !== 'Messages'" />
    </v-main>
  </div>
</template>

<script>
import { api } from "@api";
import chatLogic from "@mixins/chatLogic";
import friendsLogic from "@mixins/friendsLogic";

export default {
  name: "mainLayout",
  mixins: [chatLogic, friendsLogic],
  components: {
    SideBar: () => import("@components/layouts/SideBar/SideBar"),
    NavBar: () => import("@components/layouts/NavBar"),
    Chat: () => import("@components/layouts/Chat/Chat")
  },
  data() {
    return {
      drawer: false
    };
  },
  watch: {
    "$vuetify.theme.dark"(val) {
      if (this.$user) {
        api.userSettings
          .changeTheme({ isDarkTheme: val })
          .then(({ data }) => {
            this.$store.commit("user/setUserSettings", data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    "$i18n.locale"(val) {
      if (this.$user) {
        api.userSettings
          .changeLocale({ locale: val })
          .then(({ data }) => {
            this.$store.commit("user/setUserSettings", data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    }
  },
  methods: {
    updateDrawer(value) {
      this.drawer = value;
    }
  }
};
</script>

<style lang="scss">
.my-wrapper {
  .v-main {
    min-height: 100%;
  }
  .container {
    width: 100%;
    min-height: 100%;
    max-height: calc(100vh - 64px);
    display: flex;
    /*overflow: auto;*/
  }
}
</style>
