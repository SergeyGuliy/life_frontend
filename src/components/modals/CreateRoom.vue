<template>
  <v-dialog
    persistent
    :value="!!component"
    width="500"
    @click:outside.prevent.stop="close()"
  >
    <v-card class="CreateRoom">
      <v-card-title class="pb-8">
        Privacy Policy
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12" class="py-0">
            <v-text-field label="Название комнаты" outlined />
          </v-col>
          <v-col cols="6" class="py-0">
            <v-text-field label="Sssss" outlined />
          </v-col>
          <v-col cols="6" class="py-0">
            <v-text-field label="Sssss" outlined />
          </v-col>
          <v-col class="py-0">
            <v-range-slider
              v-model="range"
              outlined
              label="К-во пользователей"
              :max="max"
              :min="min"
              hide-details
              class="align-center"
            >
              <template v-slot:prepend>
                <v-text-field
                  outlined
                  :value="range[0]"
                  class="mt-0 pt-0"
                  hide-details
                  single-line
                  type="number"
                  style="width: 60px"
                  @change="$set(range, 0, $event)"
                ></v-text-field>
              </template>
              <template v-slot:append>
                <v-text-field
                  outlined
                  :value="range[1]"
                  class="mt-0 pt-0"
                  hide-details
                  single-line
                  type="number"
                  style="width: 60px"
                  @change="$set(range, 1, $event)"
                ></v-text-field>
              </template>
            </v-range-slider>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="close(true)">
          I accept
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import modal from "../../mixins/modal";

export default {
  name: "CreateRoom",
  mixins: [modal],
  data() {
    return {
      min: 2,
      max: 10,
      range: [2, 10]
    };
  }
};
</script>

<style lang="scss">
.CreateRoom {
  .v-input__slider > .v-input__control .v-input__slot {
    display: block;
  }
}
</style>
