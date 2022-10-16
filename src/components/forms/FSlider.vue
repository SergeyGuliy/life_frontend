<template>
  <div>
    <div class="label mb-2">
      {{ label }}
    </div>
    <v-slider
      v-model="localValue"
      outlined
      :max="max"
      :min="min"
      :step="step"
      hide-details
      class="align-center"
    >
      <template v-slot:prepend>
        <v-text-field
          outlined
          dense
          :max="max"
          :min="min"
          :step="step"
          :label="$t('misc.min')"
          v-model.number="localValue"
          class="mt-0 pt-0 mr-3"
          hide-details
          type="number"
          style="width: 100px"
        ></v-text-field>
      </template>
    </v-slider>
  </div>
</template>

<script>
export default {
  name: "FSlider",
  props: {
    value: {
      type: Number,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    step: {
      type: Number,
      default: 1
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
