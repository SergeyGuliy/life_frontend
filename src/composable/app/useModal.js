import { storeToRefs } from "pinia";

import { useModalStore } from "@stores";

export function useModal() {
  const modalStore = useModalStore();

  const { component, data } = storeToRefs(modalStore);

  function openModal(modalName, data = {}) {
    modalStore.setModal({
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
    window.dispatchEvent(
      new CustomEvent("modalClose", {
        detail: data,
      })
    );
    modalStore.closeModal();
  }

  return { openModal, closeModal, component, data };
}
