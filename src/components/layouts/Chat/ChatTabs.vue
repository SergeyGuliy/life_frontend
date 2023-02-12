<template>
  <v-tabs v-model="activeChatLocal" :vertical="vertical">
    <v-tab
      v-for="(chatTab, index) in chatTabs"
      :key="index"
      class="ma-0"
      :href="`#${chatTab}`"
    >
      {{ $filters.getChatTabName(chatTab) }}
    </v-tab>
  </v-tabs>
</template>

<script setup>
import { computed } from "vue";

import { useStoreChats } from "@stores/chats";
const { chatTabs } = useStoreChats();

const emit = defineEmits(["input"]);
const props = defineProps({
  value: {
    required: true,
    type: String,
  },
  vertical: {
    default: () => false,
    type: Boolean,
  },
});

const activeChatLocal = computed({
  get() {
    return props.value;
  },
  set(val) {
    emit("input", val);
  },
});
</script>
