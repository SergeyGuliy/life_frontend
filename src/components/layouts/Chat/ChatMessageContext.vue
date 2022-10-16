<template>
  <v-menu
    v-model="showMenu"
    :position-x="x"
    :position-y="y"
    absolute
    offset-y
    transition="scale-transition"
  >
    <v-list v-if="showMenu">
      <template v-for="({ action, title }, index) in items">
        <v-list-item :key="index" link @click="action(messageSenderId)">
          <v-list-item-title>{{ title }}</v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-menu>
</template>

<script>
import { $usersActions } from "@composable/$usersActions";
const { writeMessage, addToFriend, openProfile } = $usersActions();

export default {
  name: "ChatMessageContext",

  props: {
    messageSenderId: {},
    messageId: {}
  },

  data() {
    return {
      showMenu: false,
      x: 0,
      y: 0,
      items: [
        {
          title: this.$t("buttons.openProfile"),
          action: openProfile
        },
        {
          title: this.$t("buttons.writeMessage"),
          action: writeMessage
        },
        {
          title: this.$t("buttons.addToFriend"),
          action: addToFriend
        }
      ]
    };
  },

  mounted() {
    this.$busInit({
      clickOutside: this.hideContextMenu,
      openContext: this.openContext
    });

    this.$eventListenersInit({
      scroll: [this.hideContextMenu, document]
    });
  },

  methods: {
    hideContextMenu() {
      this.showMenu = false;
      this.x = 0;
      this.y = 0;
    },

    openContext(messageId) {
      const otherMessageOpened = messageId !== this.messageId;

      if (otherMessageOpened && this.showMenu) {
        this.showMenu = false;
      }
    },

    showContextMenu(e) {
      this.showMenu = false;
      setTimeout(() => {
        this.showMenu = true;
        this.x = e.clientX;
        this.y = e.clientY;
      }, 0);
    }
  }
};
</script>
