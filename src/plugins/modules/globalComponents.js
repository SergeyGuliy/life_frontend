import Vue from "vue";

import Grid from "../../components/UI/Grid";
import Title from "../../components/UI/Title";
import UserAvatar from "../../components/UI/UserAvatar";

const globalComponents = [Grid, UserAvatar, Title];

globalComponents.forEach(component => {
  Vue.component(component.name, component);
});
