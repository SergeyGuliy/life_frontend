<template>
  <div class="my-wrapper">
    <NavBar v-model="drawer" />
    <SideBar v-model="drawer" />
    <v-main>
      <v-container>
        <slot />
      </v-container>
      <ChatRoot v-if="$route.name !== 'Messages'" />
    </v-main>
  </div>
</template>

<script>
// import chatLogic from "@mixins/chatLogic";
// import friendsLogic from "@mixins/friendsLogic";

import SideBar from "@components/layouts/SideBar/SideBar.vue";
import NavBar from "@components/layouts/NavBar.vue";
import ChatRoot from "@components/layouts/Chat/ChatRoot.vue";

import { useUsers, useChatLogic, useSocket } from "@composable";
import {
  API_getYourConnections,
  API_getYourFriends,
  API_changeLocale,
  API_changeTheme,
} from "@api";
import { useStoreFriends, useStoreAuth } from "@stores";

export default {
  name: "mainLayout",
  // mixins: [chatLogic, friendsLogic],
  setup() {
    useChatLogic();
    const { myUser } = useUsers();
    const { setFriends, setConnections } = useStoreFriends();
    const { setUserSettings } = useStoreAuth();
    const { socketConnect } = useSocket();

    return {
      myUser,
      setFriends,
      setConnections,
      setUserSettings,
      socketConnect,
    };
  },
  components: {
    SideBar,
    NavBar,
    ChatRoot,
  },
  data() {
    return {
      drawer: false,
    };
  },

  async mounted() {
    await API_getYourFriends()
      .then(this.setFriends)
      .catch((e) => {
        console.log(e);
      });
    await API_getYourConnections()
      .then(this.setConnections)
      .catch((e) => {
        console.log(e);
      });
    this.socketConnect();
  },

  watch: {
    "$vuetify.theme.dark"(val) {
      if (!this.myUser) return;

      API_changeTheme({ isDarkTheme: val })
        .then((data) => this.setUserSettings(data))
        .catch((e) => console.log(e));
    },
    "$i18n.locale"(val) {
      if (!this.myUser) return;

      API_changeLocale({ locale: val })
        .then((data) => this.setUserSettings(data))
        .catch((e) => console.log(e));
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
