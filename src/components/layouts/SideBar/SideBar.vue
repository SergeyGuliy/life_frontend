<script setup>
import { computed, defineProps, defineEmits, ref } from "vue";

import SideBarList from "./SideBarList.vue";
import SideBarUserBlock from "./SideBarUserBlock.vue";

import { useAuth } from "@composable";

const { logOutMiddleware } = useAuth();

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: { type: Boolean, required: true },
});

const itemsSettings = ref([
  {
    title: "layout.cabinet",
    icon: "mdi-settings",
    linkParams: { name: "Cabinet" },
  },
]);
const itemsPrivate = ref([
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
]);
const itemsGlobal = ref([
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
]);

const localDrawer = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
</script>

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
