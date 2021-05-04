import { mapActions } from "vuex";
import Vue from "vue";

Vue.mixin({
  data() {
    return {};
  },
  computed: {
    $user() {
      return this.$store.state.user?.user;
    }
  },
  methods: {
    ...mapActions("modals", ["setModal"])
  }
});
