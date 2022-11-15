<template>
  <v-dialog
    persistent
    class="p-2"
    :value="!!component"
    width="500"
    @click:outside.prevent.stop="close()"
  >
    <v-card class="TakeCredit">
      <v-form ref="takeCredit">
        <v-card-title class="pb-4 flex flex-column"> </v-card-title>

        <v-card-text> </v-card-text>
        <pre>{{ $gameUserNews }}</pre>

        <v-card-actions class="px-5 pt-0 pb-5"> </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import modal from "@/mixins/modal";

export default {
  name: "News",
  mixins: [modal]
};
</script>
