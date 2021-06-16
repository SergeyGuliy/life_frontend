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
          <v-img class="elevation-6" :src="message.messageSender" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="d-flex justify-space-between">
            <span>{{
              message.messageSender.userId === $user.userId
                ? "Me"
                : message.messageSender.firstName
            }}</span>
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
    <ChatAudio
      class="mt-1"
      v-else
      :file="$getVoiceLink(message.messageVoice)"
    ></ChatAudio>
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
        { title: "btns.openProfile", action: "$openUserProfile" },
        { title: "btns.writeMessage", action: "$writeMessageToUser" },
        { title: "btns.addToFriend", action: "$addUserToFriendsList" }
      ]
    };
  },
  mounted() {
    this.$bus.on("click-outside", this.hideContextMenu);
  },
  beforeDestroy() {
    this.$bus.off("click-outside", this.hideContextMenu);
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
