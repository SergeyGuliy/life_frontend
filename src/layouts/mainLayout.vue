<template>
  <div class="my-wrapper">
    <NavBar v-model="drawer" />
    <SideBar v-model="drawer" />
    <v-main>
      <v-container>
        <slot />
      </v-container>
<!--      <Chat v-if="$route.name !== 'Messages'" />-->
    </v-main>
  </div>
</template>

<script>
// import chatLogic from "@mixins/chatLogic";
// import friendsLogic from "@mixins/friendsLogic";

import SideBar from "../components/layouts/SideBar/SideBar.vue";
import NavBar from "../components/layouts/NavBar.vue";
import {API_changeLocale, API_changeTheme} from "@api/userSettings";
// import Chat from "../components/layouts/Chat/Chat.vue";

export default {
  name: "mainLayout",
  // mixins: [chatLogic, friendsLogic],
  components: {
    SideBar,
    NavBar,
    // Chat,
  },
  data() {
    return {
      drawer: false,
    };
  },

  watch: {
    "$vuetify.theme.dark"(val) {
      if (this.$user) {
        API_changeTheme({ isDarkTheme: val })
          .then((data) => {
            this.$store.commit("user/setUserSettings", data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    "$i18n.locale"(val) {
      if (this.$user) {
        API_changeLocale({ locale: val })
          .then((data) => {
            this.$store.commit("user/setUserSettings", data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
  },
};
</script>

<style lang="scss">
.my-wrapper {
  max-height: 100vh;
  overflow-y: auto;

  .v-main {
    min-height: 100%;
  }
  .container {
    width: 100%;
    min-height: 100%;
    display: flex;
    /*overflow: auto;*/
  }
}
</style>
