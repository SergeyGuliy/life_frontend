import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      loading: false
    };
  },
  computed: {
    ...mapState("modals", ["data", "component"])
  },
};
