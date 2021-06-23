import { myVue } from "../../../../main";

export const $noti = {
  error(message) {
    myVue.$notify({
      group: "foo",
      type: "error",
      title: message
    });
  },
  warning(message) {
    myVue.$notify({
      group: "foo",
      type: "warn",
      title: message
    });
  },
  success(message) {
    myVue.$notify({
      group: "foo",
      type: "success",
      title: message
    });
  },
  info(message) {
    myVue.$notify({
      group: "foo",
      type: "info",
      title: message
    });
  }
};
