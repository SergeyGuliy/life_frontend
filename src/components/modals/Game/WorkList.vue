<template>
  <v-dialog
    persistent
    class="p-2"
    :value="!!component"
    width="500"
    @click:outside.prevent.stop="close()"
  >
    <v-card class="WorkList" v-if="works">
      <v-card-title class="pb-0">
        Available works:
      </v-card-title>
      <pre>{{ works }}</pre>
    </v-card>
  </v-dialog>
</template>

<script>
import modal from "@mixins/modal";

export default {
  name: "WorkList",

  mixins: [modal],

  created() {
    this.fetchWorksList();
  },

  watch: {
    $gameDate() {
      this.fetchWorksList();
    }
  },

  data() {
    return {
      works: null
    };
  },

  methods: {
    fetchWorksList() {
      this.$gameAction("gamesWork", "getWorksList").then(worksList => {
        console.log(worksList);
        this.works = worksList;
      });
    }
  }
};
</script>
