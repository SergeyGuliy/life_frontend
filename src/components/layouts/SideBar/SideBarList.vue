<script setup>
import { useMyRouter, useLocale } from "@composable";

const { t } = useLocale();
const { routerPush } = useMyRouter();

defineProps({
  items: { required: true, type: Array },
});
</script>

<template>
  <v-list>
    <v-list-item
      v-for="(item, index) in items"
      :key="index"
      link
      @click="routerPush(item.linkParams)"
    >
      <template v-slot:prepend>
        <v-icon :icon="item.icon"></v-icon>
      </template>

      <v-list-item-title>{{ t(item.title) }}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>
