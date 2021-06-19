<template>
  <v-list>
    <v-list-item
      v-for="(item, index) in items"
      :key="index"
      link
      @click="$router.push(item.linkParams)"
    >
      <v-list-item-icon>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
      </v-list-item-content>
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
