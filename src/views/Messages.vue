<template>
  <div class="messages container__inner">
    <v-row class="messages__row fill-height">
      <v-col class="px-1 messages__col" cols="4">
        <v-card class="pa-2">
          <v-card-text class="pa-1">
            <div class="body-1 mb-4">
              List of Chats
            </div>
            <ChatTabs v-model="activeChat" :vertical="true" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="px-1 messages__col" cols="8">
        <v-card class="pa-0 messages__card">
          <v-card-text class="pa-0 messages__card-text">
            <ChatHeader :showClose="false" :activeChat="activeChat" />
            <ChatBody :activeChat="activeChat" :isSmall="false" />
            <ChatForm :activeChat="activeChat" />
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
    ChatHeader: () => import("../components/layouts/Chat/ChatHeader"),
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
.messages {
  width: 100%;
  .messages__row {
  }
  .messages__col {
    max-height: 100%;
    height: 100%;
  }
  .messages__card {
    max-height: 100%;
    height: 100%;
    overflow: hidden;
  }
  .messages__card-text {
    height: 100%;
    display: flex;
    flex-direction: column;
    .py-2.px-4 {
      overflow: auto;
      flex: 1 1 auto;
    }
  }
}
</style>
