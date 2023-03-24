<script setup>
import { computed } from "vue";

import { useStoreChats } from "@stores/chats";
import { getChatTabName } from "@plugins/modules/globalFilters/filters/getChatTabName";

const { chatTabs } = useStoreChats();

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: { required: true, type: [String, Number] },
  vertical: { default: () => false, type: Boolean },
});

const activeChatLocal = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
</script>

<template>
  <v-tabs v-model="activeChatLocal" :vertical="vertical">
    <v-tab
      v-for="(chatTab, index) in chatTabs"
      :key="index"
      class="ma-0"
      :value="chatTab"
    >
      {{ getChatTabName(chatTab) }}
    </v-tab>
  </v-tabs>
</template>
