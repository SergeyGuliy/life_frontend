<script setup>
import { computed, defineProps } from "vue";

const emit = defineEmits(["update:roomName", "update:typeOfRoom", "submit"]);
const props = defineProps({
  filterData: { type: Object, required: true },
});

const roomName = computed({
  get: () => props.filterData.roomName,
  set: (val) => emit("update:roomName", val),
});

const typeOfRoom = computed({
  get: () => props.filterData.typeOfRoom,
  set: (val) => emit("update:typeOfRoom", val),
});
</script>

<template>
  <div class="RoomFilter pa-0">
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
        <v-btn small block @click="emit('submit')">
          {{ $t("buttons.search") }}
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

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
