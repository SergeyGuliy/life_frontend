import { mapActions, mapState } from "vuex";
import Vue from "vue";

Vue.mixin({
  data() {
    return {};
  },
  computed: {
    ...mapState("auth", { $user: "user" })
  },
  methods: {
    ...mapActions("modals", ["setModal"])
  }
});
