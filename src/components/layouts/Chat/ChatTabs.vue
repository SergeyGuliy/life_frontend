<template>
  <v-tabs v-model="activeChatLocal" :vertical="vertical">
    <v-tab
      v-for="(chatTab, index) in $chatTabs"
      :key="index"
      class="ma-0"
      :href="`#${chatTab}`"
    >
      {{ $filters.getChatTabName(chatTab) }}
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  name: "ChatTabs",
  props: {
    value: {
      required: true,
      type: String,
    },
    vertical: {
      default: () => false,
      type: Boolean,
    },
  },
  computed: {
    activeChatLocal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
};
</script>
