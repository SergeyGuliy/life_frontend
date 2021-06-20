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
import { api } from "../assets/helpers/api";
import chatLogic from "../mixins/chatLogic";

export default {
  name: "mainLayout",
  mixins: [chatLogic],
  components: {
    SideBar: () => import("../components/layouts/SideBar/SideBar"),
    NavBar: () => import("../components/layouts/NavBar"),
    Chat: () => import("../components/layouts/Chat/Chat")
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
          .changeTheme(val)
          .then(data => {
            console.log(data.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    "$i18n.locale"(val) {
      if (this.$user) {
        api.userSettings
          .changeLocale(val)
          .then(data => {
            console.log(data.data);
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
  /*.container {*/
  /*  min-height: 100%;*/
  /*}*/
}
</style>
