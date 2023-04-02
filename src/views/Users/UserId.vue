<script setup>
import { computed } from "vue";

import { useMyRouter } from "@composable";
import { useStoreDictionaries } from "@stores";

const { getUserById } = useStoreDictionaries();

const userData = computed(() => getUserById(useMyRouter.routeParams()));
</script>

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

<style lang="scss">
.UserId {
}
</style>
