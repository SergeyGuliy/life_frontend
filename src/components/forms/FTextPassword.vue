<template>
  <div>
    <div class="label mb-2">{{ label }}</div>
    <v-text-field
      v-model="localValue"
      :type="showPassword ? 'password' : 'text'"
      @click:append="showPassword = !showPassword"
      :append-icon="showPassword ? 'mdi-lock' : 'mdi-lock-open'"
      outlined
      dense
      :error-messages="error"
    />
  </div>
</template>

<script>
export default {
  name: "FTextPassword",
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
    value: {
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
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
};
</script>
