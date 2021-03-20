<template>
  <v-navigation-drawer absolute temporary :value="value" @input="updateDrawer">
    <v-list>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        link
        @click="$router.push(item.linkParams)"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn block @click="logout">
          {{ $t("layout.logout") }}
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "SideBar",
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      items: [
        {
          title: "layout.main",
          icon: "mdi-view-dashboard",
          linkParams: { name: "Home" }
        },
        {
          title: "layout.cabinet",
          icon: "mdi-account-settings",
          linkParams: { name: "Cabinet" }
        },
        {
          title: "layout.users",
          icon: "mdi-account-group",
          linkParams: { name: "Users" }
        },
        // {
        //   title: "UserId",
        //   icon: "mdi-briefcase-check",
        //   linkParams: { name: "UserId", params: "123" }
        // },
        {
          title: "layout.rooms",
          icon: "mdi-google-classroom",
          linkParams: { name: "Rooms" }
        }
        // {
        //   title: "RoomId",
        //   icon: "mdi-briefcase-check",
        //   linkParams: { name: "RoomId", params: "123" }
        // }
      ]
    };
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch("auth/logOut");
        this.$vuetify.theme.dark = false;
      } catch (e) {
        this.$emit("onError", e);
      }
    },
    updateDrawer(value) {
      this.$emit("updateDrawer", value);
    }
  }
};
</script>
