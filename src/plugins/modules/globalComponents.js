import Grid from "@components/global/Grid.vue";
import Title from "@components/global/Title.vue";
import UserAvatar from "@components/global/UserAvatar.vue";
import FTextField from "@components/forms/FTextField.vue";
import FSwitch from "@components/forms/FSwitch.vue";
import FSlider from "@components/forms/FSlider.vue";
import FRange from "@components/forms/FRange.vue";
import FTextPassword from "@components/forms/FTextPassword.vue";

const globalComponents = {
  Grid,
  UserAvatar,
  Title,
  FTextField,
  FSwitch,
  FRange,
  FSlider,
  FTextPassword
};

export function installGlobalComponents(vue) {
  Object.entries(globalComponents).forEach(([componentName, component]) => {
    vue.component(componentName, component);
  })
};
