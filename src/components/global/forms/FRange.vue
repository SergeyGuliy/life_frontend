<template>
  <div>
    <div class="label mb-2">
      {{ label }}
    </div>
    <v-range-slider
      v-model="localValue"
      outlined
      :max="max"
      :min="min"
      hide-details
      class="align-center"
    >
      <template v-slot:prepend>
        <v-text-field
          outlined
          dense
          :max="max"
          :min="min"
          :label="$t('misc.min')"
          v-model="localValueMin"
          class="mt-0 pt-0 mr-3"
          hide-details
          type="number"
          style="width: 60px"
        ></v-text-field>
      </template>
      <template v-slot:append>
        <v-text-field
          outlined
          dense
          :max="max"
          :min="min"
          :label="$t('misc.max')"
          v-model="localValueMax"
          class="mt-0 pt-0 ml-3"
          hide-details
          type="number"
          style="width: 60px"
        ></v-text-field>
      </template>
    </v-range-slider>
  </div>
</template>

<script>
export default {
  name: "FRange",
  emits: ["update:minValue", "update:maxValue"],
  props: {
    minValue: {
      type: Number,
      required: true,
    },
    maxValue: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
  },
  computed: {
    localValue: {
      get() {
        return [this.minValue, this.maxValue];
      },
      set(val) {
        this.$emit("update:minValue", +Math.min(val[0], val[1]));
        this.$emit("update:maxValue", +Math.max(val[0], val[1]));
      },
    },
    localMin() {
      return Math.min(this.minValue, +this.maxValue);
    },
    localMax() {
      return Math.max(this.minValue, +this.maxValue);
    },
    localValueMin: {
      get() {
        return this.localMin;
      },
      set(val) {
        this.$emit("update:minValue", +val);
      },
    },
    localValueMax: {
      get() {
        return this.localMax;
      },
      set(val) {
        this.$emit("update:maxValue", +val);
      },
    },
  },
};
</script>

<style scoped></style>
