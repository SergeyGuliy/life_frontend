<template>
  <v-container class="home">
    <v-row>
      <v-col cols="6">
        {{ users }}
      </v-col>
      <v-col cols="6">
        <RoomsController />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import socketMixin from "../mixins/socketMixin";

export default {
  name: "Home",
  // mixins: [socketMixin],
  components: {
    RoomsController: () => import("../components/Rooms/RoomsController")
  },
  data() {
    return {
      users: null
    };
  }
};
</script>
