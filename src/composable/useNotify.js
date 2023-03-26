import { useNotification } from "@kyvg/vue3-notification";

export function useNotify() {
  const { notify } = useNotification();

  const notifyError = (title) => notify({ type: "error", title });

  const notifyWarning = (title) => notify({ type: "warn", title });

  const notifySuccess = (title) => notify({ type: "success", title });

  const notifyInfo = (title) => notify({ type: "info", title });

  return {
    notifyError,
    notifyWarning,
    notifySuccess,
    notifyInfo,
  };
}
