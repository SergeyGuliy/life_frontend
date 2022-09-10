<template>
  <div>
    <div class="label mb-2">{{ label }}</div>
    <v-text-field dense outlined v-model="localValue" />
  </div>
</template>

<script>
export default {
  name: "FTextField",
  props: {
    value: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  computed: {
    localValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  }
};
</script>
