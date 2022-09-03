import { api } from "@api";

export default {
  async mounted() {
    await api.friendship
      .getYourFriends()
      .then(({ data }) => {
        this.$store.commit("friends/setFriends", data);
      })
      .catch(e => {
        console.log(e);
      });
    await api.friendship
      .getYourConnections()
      .then(({ data }) => {
        this.$store.commit("friends/setConnections", data);
      })
      .catch(e => {
        console.log(e);
      });
  }
};
