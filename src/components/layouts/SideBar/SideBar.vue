<template>
  <v-navigation-drawer temporary v-model="localDrawer">
    <SideBarUserBlock />
    <v-divider />

    <SideBarList :items="itemsPrivate" />
    <v-divider />

    <SideBarList :items="itemsGlobal" />
    <v-divider />

    <SideBarList :items="itemsSettings" />


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
import { defineAsyncComponent } from "vue";

import {useAuth} from "../../../composable/useAuth";

export default {
  name: "SideBar",
  emits: ['update:modelValue'],

  components: {
    SideBarList: defineAsyncComponent(() => import("./SideBarList.vue")),
    SideBarUserBlock: defineAsyncComponent(() => import("./SideBarUserBlock.vue")),
  },

  setup() {
    const { logOutMiddleware } = useAuth();

    return {logOutMiddleware}
  },

  computed: {
    localDrawer: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.$emit("update:modelValue", val);
      }
    }
  },

  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      itemsSettings: [
        {
          title: "layout.cabinet",
          icon: "mdi-settings",
          linkParams: { name: "Cabinet" },
        },
      ],
      itemsPrivate: [
        {
          title: "layout.main",
          icon: "mdi-view-dashboard",
          linkParams: { name: "Home" },
        },
        {
          title: "layout.friends",
          icon: "mdi-account-group",
          linkParams: { name: "Friends" },
        },
        {
          title: "Messages",
          icon: "mdi-message-bulleted",
          linkParams: { name: "Messages" },
        },
      ],
      itemsGlobal: [
        {
          title: "layout.users",
          icon: "mdi-account-group",
          linkParams: { name: "Users" },
        },
        {
          title: "layout.rooms",
          icon: "mdi-google-classroom",
          linkParams: { name: "Rooms" },
        },
      ],
    };
  },
};
</script>
