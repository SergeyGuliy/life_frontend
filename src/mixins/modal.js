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
  methods: {
    ...mapActions("modals", ["closeModal"]),

    close(data = null) {
      if (!this.loading) {
        window.dispatchEvent(
          new CustomEvent("modalClose", {
            detail: data
          })
        );
        this.closeModal();
      }
    }
  }
};
