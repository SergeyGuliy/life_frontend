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
export default {
  name: "Home",
  components: {
    RoomsController: () => import("../components/Rooms/RoomsController")
  },
  data() {
    return {
      users: null,
      sss: null
    };
  },
};
</script>
