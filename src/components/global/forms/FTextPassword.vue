<template>
  <div>
    <div class="label mb-2">{{ label }}</div>
    <v-text-field
      v-model="localValue"
      :type="showPassword ? 'password' : 'text'"
      @click:appendInner="showPassword = !showPassword"
      :append-inner-icon="showPassword ? 'mdi-lock' : 'mdi-lock-open'"
      outlined
      dense
      :error-messages="error"
    />
  </div>
</template>

<script>
export default {
  name: "FTextPassword",
  emits: ["update:modelValue"],
  data() {
    return {
      showPassword: true,
    };
  },

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
