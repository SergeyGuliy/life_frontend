export default {
  computed: {
    $chats() {
      return this.$store.state.chats?.chats;
    },
    $chatTabs() {
      return Object.keys(this.$chats);
    },
  },
};
