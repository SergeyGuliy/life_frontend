import { notify } from "@kyvg/vue3-notification";


export function useNotify() {
  function notifyError(message) {
    notify({
      group: "foo",
      type: "error",
      title: message
    });
  }

  function notifyWarning(message) {
    notify({
      group: "foo",
      type: "warn",
      title: message
    });
  }

  function notifySuccess(message) {
    notify({
      group: "foo",
      type: "success",
      title: message
    });
  }

  function notifyInfo(message) {
    console.warn('notifyInfo')
    notify({
      group: "foo",
      type: "info",
      title: message
    });
  }
  return {
    notifyError,
    notifyWarning,
    notifySuccess,
    notifyInfo
  };
}
