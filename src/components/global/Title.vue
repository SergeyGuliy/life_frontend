<script setup>
defineProps({
  title: { required: true, type: String },
});
</script>

<template>
  <div class="pa-2 d-flex justify-space-between align-center my-2">
    <div class="font-weight-black">
      {{ title }}
    </div>
    <slot name="actions"></slot>
  </div>
</template>

<style lang="scss">
.Title {
}
</style>
