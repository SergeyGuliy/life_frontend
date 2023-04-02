<template>
  <div>
    <div class="label mb-2" style="flex: 0">{{ label }}</div>
    <v-switch
      class="mt-0 mb-6 ml-2"
      v-model="localValue"
      :label="valueText"
      color="blue"
      hide-details
    />
  </div>
</template>

<script>
export default {
  name: "FSwitch",
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    valueText: {
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
