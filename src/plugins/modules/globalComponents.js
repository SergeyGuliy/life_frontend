import Vue from "vue";

import Grid from "@components/global/Grid";
import Title from "@components/global/Title";
import UserAvatar from "@components/global/UserAvatar";
import FTextField from "@components/forms/FTextField";
import FSwitch from "@components/forms/FSwitch";
import FRange from "@components/forms/FRange";
import FTextPassword from "@components/forms/FTextPassword";

const globalComponents = {
  Grid,
  UserAvatar,
  Title,
  FTextField,
  FSwitch,
  FRange,
  FTextPassword
};

Object.entries(globalComponents).forEach(([componentName, component]) => {
  Vue.component(componentName, component);
});
