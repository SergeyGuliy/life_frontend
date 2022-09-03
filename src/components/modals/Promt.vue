<template>
  <v-dialog
    persistent
    :value="!!component"
    width="500"
    @click:outside.prevent.stop="close()"
  >
    <v-card>
      <v-form>
        <v-card-title class="pb-6">
          {{ data.title }}
        </v-card-title>

        <v-card-actions class="py-4 px-6">
          <v-spacer></v-spacer>
          <v-btn color="danger" @click="close()">
            {{ data.cancel }}
          </v-btn>
          <v-btn color="primary" @click="close(true)">
            {{ data.submit }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import modal from "@mixins/modal";

export default {
  name: "Promt",
  mixins: [modal],
  data() {
    return {};
  }
};
</script>
