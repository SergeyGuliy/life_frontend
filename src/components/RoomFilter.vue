<template>
  <v-container fluid class="RoomFilter">
    <v-text-field dense label="Outlined" outlined></v-text-field>
    <div class="d-flex">
      <v-checkbox
        class="mt-0"
        v-model="selected"
        label="Public"
        value="PUBLIC"
        multiple
      />
      <v-checkbox
        class="mt-0 ml-4"
        v-model="selected"
        label="Private"
        value="PRIVATE"
        multiple
      />
    </div>
  </v-container>
</template>

<script>
export default {
  name: "RoomFilter",
  components: {},
  data() {
    return {
      panel: 1,
      selected: []
    };
  }
};
</script>

<style lang="scss">
.RoomFilter {
  .v-text-field__details {
    display: none !important;
  }
}
</style>
