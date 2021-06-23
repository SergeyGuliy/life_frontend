<template>
  <v-card
    dark
    max-width="80%"
    outlined
    :class="
      message.messageSender.userId === $user.userId ? 'ml-auto mr-2' : 'mr-auto'
    "
    :color="message.messageSender.userId === $user.userId ? 'primary' : ''"
    class="mb-2"
    @contextmenu="showContextMenu"
  >
    <v-card-actions>
      <v-list-item class="pa-0">
        <v-list-item-avatar color="grey darken-3 my-0">
          <UserAvatar
            v-if="$users[message.messageSender.userId]"
            :userData="message.messageSender.userId | dictionariesGetUserById"
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
          <template v-for="(item, index) in items">
            <v-list-item
              :key="index"
              link
              @click="actionHandler(item.action, message.messageSender.userId)"
            >
              <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
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
          title: "buttons.openProfile",
          action: "$usersActions.openUserProfile"
        },
        {
          title: "buttons.writeMessage",
          action: "$usersActions.writeMessageToUser"
        },
        {
          title: "buttons.addToFriend",
          action: "$usersActions.addUserToFriendsList"
        }
      ]
    };
  },
  mounted() {
    this.$bus.on("click-outside", this.hideContextMenu);
  },
  beforeDestroy() {
    this.$bus.off("click-outside", this.hideContextMenu);
  },
  computed: {
    getChatWriterName() {
      const user = this.$filters.dictionariesGetUserById(
        this.message.messageSender.userId
      );
      if (user) {
        return this.message.messageSender.userId === this.$user.userId
          ? "Me"
          : this.$filters.getUserName(user);
      } else {
        return "";
      }
    }
  },
  methods: {
    showContextMenu(e) {
      e.preventDefault();
      if (this.message.messageSender.userId !== this.$user.userId) {
        this.showMenu = false;
        setTimeout(() => {
          this.showMenu = true;
          this.x = e.clientX;
          this.y = e.clientY;
        }, 0);
      }
    },
    hideContextMenu() {
      this.showMenu = false;
      this.x = 0;
      this.y = 0;
    },
    actionHandler(action, userId) {
      this[action](userId);
    }
  }
};
</script>

<style lang="scss">
.ChatMessage {
}
</style>
