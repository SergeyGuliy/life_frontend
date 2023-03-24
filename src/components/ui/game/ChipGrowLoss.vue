<template>
  <v-chip
    :color="growLoss > 0 ? 'green' : 'red'"
    text-color="white"
    label
    small
    style="height: 20px; width: 100%; display: flex; justify-content: center"
  >
    {{ growLoss }} %
  </v-chip>
</template>

<script setup>
defineProps({
  growLoss: { type: Number, required: true },
});
</script>
