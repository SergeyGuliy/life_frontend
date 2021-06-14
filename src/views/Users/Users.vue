<template>
  <div class="Users">
    Users
  </div>
</template>

<script>
import socketMixin from "../../mixins/socketMixin";
export default {
  name: "Users",
  mixins: [socketMixin]
};
</script>

<style lang="scss">
.Users {
}
</style>
