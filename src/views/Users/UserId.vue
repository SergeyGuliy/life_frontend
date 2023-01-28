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
export default {
  name: "UserId",

  computed: {
    userData() {
      return this.$f.dictGetUserById(this.$route.params.id);
    },
  },
};
</script>

<style lang="scss">
.UserId {
}
</style>
