<template>
  <v-navigation-drawer absolute temporary :value="value" @input="updateDrawer">
    <template v-slot:prepend>
      <v-list-item two-line>
        <v-list-item-avatar>
          <UserAvatar :userData="$user" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Jane Smith</v-list-item-title>
          <v-list-item-subtitle>Logged In</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link @click="$router.push('Cabinet')">
        <v-list-item-icon>
          <v-icon>mdi-settings</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ $t("layout.cabinet") }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
    <v-divider></v-divider>
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
        <v-btn block @click="$logOutMiddleware">
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
  components: {
    UserAvatar: () => import("../UserAvatar")
  },
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
        // {
        //   title: "layout.cabinet",
        //   icon: "mdi-account-settings",
        //   linkParams: { name: "Cabinet" }
        // },
        {
          title: "layout.friends",
          icon: "mdi-account-group",
          linkParams: { name: "Friends" }
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
    updateDrawer(value) {
      this.$emit("updateDrawer", value);
    }
  }
};
</script>
