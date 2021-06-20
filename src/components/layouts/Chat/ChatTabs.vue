<template>
  <v-tabs v-model="activeChatLocal" :vertical="vertical">
    <v-tabs-slider color="yellow"></v-tabs-slider>

    <v-tab
      v-for="(chatTab, index) in $chatTabs"
      :key="index"
      class="ma-0"
      :href="`#${chatTab}`"
    >
      {{ chatTabName(chatTab) }}
    </v-tab>
  </v-tabs>
</template>

<script>
import { MESSAGE_RECEIVER_TYPES } from "../../../assets/helpers/enums";
const { GLOBAL, ROOM, PRIVATE } = MESSAGE_RECEIVER_TYPES;
export default {
  name: "ChatTabs",
  props: {
    value: {
      required: true,
      type: String
    },
    vertical: {
      default: () => false,
      type: Boolean
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
    // console.log(this.chatTabs);
  },
  methods: {
    chatTabName(chatTab) {
      if (this.$chats[chatTab].key === GLOBAL) {
        return this.$t(`enums.${GLOBAL}`);
      } else if (this.$chats[chatTab].key === ROOM) {
        return this.$t(`enums.${ROOM}`);
      } else if (this.$chats[chatTab].key === PRIVATE) {
        return this.$getUserName(this.$chats[chatTab].userData);
      }
    }
  }
};
</script>
