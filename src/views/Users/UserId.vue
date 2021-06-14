<template>
  <div class="UserId">UsersId {{ $route.params.id }}</div>
</template>

<script>
import socketMixin from "../../mixins/socketMixin";
export default {
  name: "UserId",
  components: {},
  mixins: [socketMixin],
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.UserId {
}
</style>
