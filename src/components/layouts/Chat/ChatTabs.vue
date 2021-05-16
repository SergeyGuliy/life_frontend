<template>
  <v-tabs v-model="activeChatLocal">
    <v-tabs-slider color="yellow"></v-tabs-slider>

    <v-tab
      v-for="(chatTab, index) in chatTabs"
      :key="index"
      class="ma-0"
      :href="`#${chatTab}`"
    >
      {{ chatTabName(chatTab) }}
    </v-tab>
  </v-tabs>
</template>

<script>
import { MessageReceiverTypes } from "../../../assets/helpers/enums";
const { GLOBAL, ROOM, PRIVATE } = MessageReceiverTypes;
export default {
  name: "ChatTabs",
  props: {
    chatTabs: {
      required: true,
      type: Array
    },
    chats: {
      required: true,
      type: Object
    },
    value: {
      required: true,
      type: String
    }
  },
  computed: {
    activeChatLocal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  created() {
    console.log(this.chatTabs);
  },
  methods: {
    chatTabName(chatTab) {
      if (this.chats[chatTab].key === GLOBAL) {
        return this.$t(`enums.${GLOBAL}`);
      } else if (this.chats[chatTab].key === ROOM) {
        return this.$t(`enums.${ROOM}`);
      } else if (this.chats[chatTab].key === PRIVATE) {
        return this.$getUserName(this.chats[chatTab].userData);
      }
    }
  }
};
</script>
