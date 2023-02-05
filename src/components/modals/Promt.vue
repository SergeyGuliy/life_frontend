<template>
  <v-dialog
    persistent
    :model-value="!!component"
    width="500"
  >
    <v-card>
      <v-form>
        <v-card-title class="pb-6">
          {{ data.title }}
        </v-card-title>

        <v-card-actions class="py-4 px-6">
          <v-spacer></v-spacer>
          <v-btn color="danger" @click="closeModal()">
            {{ data.cancel }}
          </v-btn>
          <v-btn color="primary" @click="closeModal(true)">
            {{ data.submit }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import {useModal} from "../../composable/useModal";

export default {
  name: "Promt",

  setup() {
    const { data, component, closeModal } = useModal()
    return { data, component, closeModal }
  },

  mounted() {
    console.error(this.component)
  },

  data() {
    return {};
  }
};
</script>
