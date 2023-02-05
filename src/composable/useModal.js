import { useModalStore } from "../stores/modals";
import { storeToRefs } from "pinia";

export function useModal() {
  const store = useModalStore();

  const { component, data } = storeToRefs(store);

  function openModal(modalName, data = {}) {
    store.setModal({
      component: modalName,
      data: data,
    });

    return new Promise(function (resolve, reject) {
      let callback = (data) => {
        if (data.detail !== null) {
          resolve(data.detail);
        } else {
          reject();
        }
        window.removeEventListener("modalClose", callback);
      };
      window.addEventListener("modalClose", callback);
    });
  }

  function closeModal(data = null) {
    // if (this.loading) return;

    window.dispatchEvent(
      new CustomEvent("modalClose", {
        detail: data,
      })
    );
    store.closeModal();
  }

  return { openModal, closeModal, component, data };
}
