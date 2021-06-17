<template>
  <v-container fluid class="RoomFilter pa-0">
    <v-text-field v-model="roomName" dense label="Outlined" outlined />
    <v-row class="my-1">
      <v-col cols="6" class="d-flex">
        <v-checkbox
          class="mt-0"
          v-model="typeOfRoom"
          :label="$t(`enums.${'PUBLIC'}`)"
          value="PUBLIC"
          multiple
        />
        <v-checkbox
          class="mt-0 ml-2"
          v-model="typeOfRoom"
          :label="$t(`enums.${'PRIVATE'}`)"
          value="PRIVATE"
          multiple
        />
      </v-col>
      <v-col cols="6">
        <v-btn small block @click="$emit('submit')">
          {{ $t("buttons.search") }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "RoomFilter",
  components: {},
  props: {
    filterData: {
      type: Object,
      required: true
    }
  },
  computed: {
    roomName: {
      set(val) {
        this.$emit("update:roomName", val);
      },
      get() {
        return this.filterData.roomName;
      }
    },
    typeOfRoom: {
      set(val) {
        this.$emit("update:typeOfRoom", val);
      },
      get() {
        return this.filterData.typeOfRoom;
      }
    }
  }
};
</script>

<style lang="scss">
.RoomFilter {
  .v-text-field__details,
  .v-messages {
    display: none !important;
  }
  .v-input__slot {
    margin-bottom: 0;
  }
  .v-input {
    padding-top: 2px;
  }
}
</style>
