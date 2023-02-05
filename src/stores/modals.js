import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", {
  state: () => ({
    data: {},
    component: null,
  }),

  actions: {
    setModal({ data, component }) {
      this.data = data;
      this.component = component;
    },
    closeModal() {
      this.$reset();
    },
  },
});
