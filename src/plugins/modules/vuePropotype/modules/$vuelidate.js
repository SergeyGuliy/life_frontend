import { myVue } from "@/main";

export const $vuelidate = {
  setup(formKey, validations, validationsMessages) {
    console.log(formKey);
    console.log(validations);
    console.log(validationsMessages);
    myVue.$on("hook:created", () => {
      console.log(this.roomData);
    });
  }
};
