<template>
  <div>
    <div class="label mb-2">{{ label }}</div>
    <v-text-field dense outlined v-model="localValue" :error-messages="error" />
  </div>
</template>

<script>
export default {
  name: "FTextField",
  emits: ["update:modelValue"],
  props: {
    error: {
      type: String,
      default: () => "",
    },
    modelValue: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  computed: {
    localValue: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit("update:modelValue", val);
      },
    },
  },
};
</script>
