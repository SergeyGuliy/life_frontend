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
import { $currentUserActions } from "@composable/$currentUserActions";
import { defineAsyncComponent } from "vue";
const { logOutMiddleware } = $currentUserActions();

export default {
  name: "SideBar",
  emits: ['updateDrawer'],

  components: {
    SideBarList: defineAsyncComponent(() => import("./SideBarList.vue")),
    SideBarUserBlock: defineAsyncComponent(() => import("./SideBarUserBlock.vue")),
  },

  computed: {
    localDrawer: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.$emit("updateDrawer", val);
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
  methods: {
    logOutMiddleware,
  },
};
</script>
