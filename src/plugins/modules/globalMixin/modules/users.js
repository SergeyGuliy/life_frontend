export default {
  computed: {
    $user() {
      return this.$store.state.user?.user;
    },
    $users() {
      return this.$store.state.dictionaries?.users;
    },
    $chats() {
      return this.$store.state.chats?.chats;
    },
    $chatTabs() {
      return Object.keys(this.$chats);
    },
    $friendsRequests() {
      return this.$store.state.friends?.friends;
    },
    $friends() {
      return this.$friendsRequests.map((i) => {
        const { friendshipReceiver, friendshipSender } = i;
        return +friendshipReceiver.userId === +this.$user.userId
          ? friendshipSender
          : friendshipReceiver;
      });
    },
    $connects() {
      return this.$store.state.friends?.connects;
    },
  },
};
