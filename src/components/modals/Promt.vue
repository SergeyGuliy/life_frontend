<template>
  <v-dialog
    persistent
    :value="!!component"
    width="500"
    @click:outside.prevent.stop="close()"
  >
    <v-card class="CreateRoom">
      <v-form>
        <v-card-title class="pb-6">
          {{ data.title }}
        </v-card-title>

        <v-card-actions class="py-4 px-6">
          <v-spacer></v-spacer>
          <v-btn color="danger" @click="close()">
            {{ $t("modals.createRoom.cancel") }}
          </v-btn>
          <v-btn color="primary" @click="close(true)">
            {{ $t("modals.createRoom.create") }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import modal from "../../mixins/modal";

export default {
  name: "Promt",
  mixins: [modal],
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.Promt {
}
</style>
