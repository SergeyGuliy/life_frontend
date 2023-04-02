import Grid from "@components/global/Grid.vue";
import Title from "@components/global/Title.vue";
import UserAvatar from "@components/global/UserAvatar.vue";
import FTextField from "@components/global/forms/FTextField.vue";
import FSwitch from "@components/global/forms/FSwitch.vue";
import FSlider from "@components/global/forms/FSlider.vue";
import FRange from "@components/global/forms/FRange.vue";
import FTextPassword from "@components/global/forms/FTextPassword.vue";

const globalComponents = {
  Grid,
  UserAvatar,
  Title,
  FTextField,
  FSwitch,
  FRange,
  FSlider,
  FTextPassword,
};

export function installGlobalComponents(vue) {
  Object.entries(globalComponents).forEach(([componentName, component]) => {
    vue.component(componentName, component);
  });
}
