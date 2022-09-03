import Vue from "vue";

import Grid from "@components/global/Grid";
import Title from "@components/global/Title";
import UserAvatar from "@components/global/UserAvatar";

const globalComponents = [Grid, UserAvatar, Title];

globalComponents.forEach(component => {
  Vue.component(component.name, component);
});
