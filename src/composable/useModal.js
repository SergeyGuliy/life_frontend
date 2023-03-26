import { storeToRefs } from "pinia";

import { useModalStore } from "@stores";

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
    window.dispatchEvent(
      new CustomEvent("modalClose", {
        detail: data,
      })
    );
    store.closeModal();
  }

  return { openModal, closeModal, component, data };
}
