import {API_getYourConnections, API_getYourFriends} from "@api/friendship";

export default {
  async mounted() {
    await API_getYourFriends()
      .then(data => {
        this.$store.commit("friends/setFriends", data);
      })
      .catch(e => {
        console.log(e);
      });
    await API_getYourConnections()
      .then(data => {
        this.$store.commit("friends/setConnections", data);
      })
      .catch(e => {
        console.log(e);
      });
  }
};
