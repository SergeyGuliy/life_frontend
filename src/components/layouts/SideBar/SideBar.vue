<template>
  <v-navigation-drawer absolute temporary :value="value" @input="updateDrawer">
    <template v-slot:prepend>
      <SideBarUserBlock />
      <SideBarList :items="itemsSettings" />
    </template>
    <v-divider />
    <SideBarList :items="itemsPrivate" />
    <v-divider />
    <SideBarList :items="itemsGlobal" />

    <template v-slot:append>
      <div class="pa-2">
        <v-btn block @click="logOutMiddleware">
          {{ $t("layout.logout") }}
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import {$currentUserActions} from "../../../composable/$currentUserActions";

export default {
  name: "SideBar",
  setup() {
    return $currentUserActions();
  },
  components: {
    SideBarList: () => import("./SideBarList"),
    SideBarUserBlock: () => import("./SideBarUserBlock")
  },
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      itemsSettings: [
        {
          title: "layout.cabinet",
          icon: "mdi-settings",
          linkParams: { name: "Cabinet" }
        }
      ],
      itemsPrivate: [
        {
          title: "layout.main",
          icon: "mdi-view-dashboard",
          linkParams: { name: "Home" }
        },
        {
          title: "layout.friends",
          icon: "mdi-account-group",
          linkParams: { name: "Friends" }
        },
        {
          title: "Messages",
          icon: "mdi-message-bulleted",
          linkParams: { name: "Messages" }
        }
      ],
      itemsGlobal: [
        {
          title: "layout.users",
          icon: "mdi-account-group",
          linkParams: { name: "Users" }
        },
        {
          title: "layout.rooms",
          icon: "mdi-google-classroom",
          linkParams: { name: "Rooms" }
        }
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
