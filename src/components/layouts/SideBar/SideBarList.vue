<template>
  <v-list>
    <v-list-item
      v-for="(item, index) in items"
      :key="index"
      link
      @click="$router.push(item.linkParams)"
    >
      <template v-slot:prepend>
        <v-icon :icon="item.icon"></v-icon>
      </template>

      <v-list-item-title>
        <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "SideBarList",
  props: {
    items: {
      required: true,
      type: Array
    }
  }
};
</script>
