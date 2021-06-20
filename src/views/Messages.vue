<template>
  <div class="Messages">
    <v-row>
      <v-col class="px-1" cols="4">
        <v-card class="pa-2">
          <v-card-text class="pa-1">
            <ChatTabs
              v-model="activeChat"
              :vertical="true"
              :chatTabs="$chatTabs"
              :chats="$chats"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="px-1" cols="8">
        <v-card class="pa-2">
          <v-card-text class="pa-1">
            <ChatBody
              :activeChat="activeChat"
              :chatTabs="$chatTabs"
              :chats="$chats"
            />
            <ChatForm :activeChat="activeChat" :chats="$chats" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { MESSAGE_RECEIVER_TYPES } from "../assets/helpers/enums";
const { GLOBAL } = MESSAGE_RECEIVER_TYPES;

export default {
  name: "Messages",
  components: {
    ChatForm: () => import("../components/layouts/Chat/ChatForm"),
    ChatBody: () => import("../components/layouts/Chat/ChatBody"),
    ChatTabs: () => import("../components/layouts/Chat/ChatTabs")
  },

  mounted() {
    this.$bus.on("writeMessageToUser", this.writeMessageToUser);
  },
  beforeDestroy() {
    this.$bus.off("writeMessageToUser", this.writeMessageToUser);
  },
  data() {
    return {
      activeChat: GLOBAL
    };
  },
  methods: {
    async writeMessageToUser(userData) {
      setTimeout(() => {
        this.isChatOpened = true;
        this.activeChat = this.$chat.getUserChatKey(userData);
      }, 1);
    }
  }
};
</script>

<style lang="scss">
.Messages {
}
</style>
