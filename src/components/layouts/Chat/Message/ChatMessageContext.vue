<script setup>
import { defineProps, onUnmounted, reactive, ref } from "vue";

import { useEventsListener, useUsersActions, useBus } from "@composable";
import { useLocale } from "../../../../composable";

const { writeMessage, addToFriend, openProfile } = useUsersActions();
const { busInit } = useBus();
const { t } = useLocale();

defineProps({
  messageSenderId: {},
  messageId: {},
});

const showMenu = ref(false);
const coords = reactive({
  x: 0,
  y: 0,
});
const items = ref([
  {
    title: t("buttons.openProfile"),
    action: openProfile,
  },
  {
    title: t("buttons.writeMessage"),
    action: writeMessage,
  },
  {
    title: t("buttons.addToFriend"),
    action: addToFriend,
  },
]);

function hideContextMenu() {
  showMenu.value = false;
  coords.x = 0;
  coords.y = 0;
}

function openContext(messageId) {
  const otherMessageOpened = messageId !== this.messageId;

  if (otherMessageOpened && this.showMenu) {
    showMenu.value = false;
  }
}

function showContextMenu(e) {
  showMenu.value = false;
  setTimeout(() => {
    showMenu.value = true;
    coords.x = e.clientX;
    coords.y = e.clientY;
  }, 0);
}

onUnmounted(() => {
  busInit({
    clickOutside: hideContextMenu,
    openContext: openContext,
  });

  useEventsListener({
    scroll: [hideContextMenu, document],
  });
});

defineExpose({ showContextMenu });
</script>

<template>
  <v-menu
    v-model="showMenu"
    :position-x="coords.x"
    :position-y="coords.y"
    absolute
    offset-y
    transition="scale-transition"
  >
    <v-list v-if="showMenu">
      <v-list-item
        v-for="({ action, title }, index) in items"
        :key="index"
        link
        @click="action(messageSenderId)"
      >
        <v-list-item-title>{{ title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
