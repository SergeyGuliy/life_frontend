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

<script>
export default {
  name: "chipGrowLoss",

  props: {
    growLoss: {
      type: Number,
      required: true
    }
  }
};
</script>
