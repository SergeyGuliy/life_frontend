<template>
  <Grid>
    <template #leftCol>
      <Title :title="$t('pages.cabinet.profileSettings')" />
      <pre>{{ userData }}</pre>
    </template>
    <template #rightCol>
      <Title :title="$t('pages.cabinet.profileSettings')" />
    </template>
  </Grid>
</template>

<script>
import { getUserById } from "@helpers";

export default {
  name: "UserId",

  computed: {
    userData() {
      return getUserById(this.$route.params.id);
    },
  },
};
</script>

<style lang="scss">
.UserId {
}
</style>
