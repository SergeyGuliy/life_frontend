<template>
  <v-card
    dark
    max-width="80%"
    outlined
    :class="isYouAuthor ? 'ml-auto mr-2' : 'mr-auto'"
    :color="isYouAuthor ? 'primary' : ''"
    class="mb-2"
    @contextmenu="showContextMenu"
  >
    <v-card-actions>
      <v-list-item class="pa-0">
        <v-list-item-avatar color="grey darken-3 my-0">
          <UserAvatar
            v-if="$users[message.messageSender.userId]"
            :userData="message.messageSender"
          />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="d-flex justify-space-between">
            <span>{{ getChatWriterName }}</span>
            <span>{{ message.createdAt | chatDate }}</span>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
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
            <v-list-item
              :key="index"
              link
              @click="action(message.messageSender.userId)"
            >
              <v-list-item-title>{{ title }}</v-list-item-title>
            </v-list-item>
          </template>
        </v-list>
      </v-menu>
    </v-card-actions>
    <v-card-text class="py-2" v-if="message.messageType === 'TEXT'">
      <p>{{ message.messageText }}</p>
    </v-card-text>
    <v-card-text class="pt-1 pb-4 px-1" v-else>
      <ChatAudio class="mt-1" :file="message.messageVoice | voiceLink" />
    </v-card-text>
  </v-card>
</template>

<script>
import { $usersActions } from "@composable/$usersActions";
const { writeMessage, addToFriend, openProfile } = $usersActions();

export default {
  name: "ChatMessage",

  components: {
    ChatAudio: () => import("./ChatAudio")
  },
  props: {
    message: {
      required: true,
      type: Object
    }
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
  },

  computed: {
    isYouAuthor() {
      return this.message.messageSender.userId === this.$user.userId;
    },

    getChatWriterName() {
      const messageSenderId = this.message.messageSender.userId;
      const messageSender = this.$filters.dictGetUserById(messageSenderId);

      if (messageSender) {
        return this.isYouAuthor
          ? "Me"
          : this.$filters.getUserName(messageSender);
      }
      return "";
    }
  },
  methods: {
    showContextMenu(e) {
      e.preventDefault();
      this.$bus.emit("openContext", this.message.messageId);
      if (this.isYouAuthor) return;

      this.showMenu = false;
      setTimeout(() => {
        this.showMenu = true;
        this.x = e.clientX;
        this.y = e.clientY;
      }, 0);
    },

    openContext(messageId) {
      const otherMessageOpened = messageId !== this.message.messageId;

      if (otherMessageOpened && this.showMenu) {
        this.showMenu = false;
      }
    },

    hideContextMenu() {
      this.showMenu = false;
      this.x = 0;
      this.y = 0;
    }
  }
};
</script>
