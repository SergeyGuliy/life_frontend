<template>
  <div class="pa-2 d-flex justify-space-between align-center my-2">
    <div class="font-weight-black">
      {{ title }}
    </div>
    <slot name="actions"></slot>
  </div>
</template>

<script>
export default {
  name: "Title",
  props: {
    title: {
      required: true,
      type: String
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.Title {
}
</style>
