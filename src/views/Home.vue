<template>
  <v-container class="home">
    <v-row>
      <v-col cols="6">
        <pre>{{ $user }}</pre>
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
    RoomsController: () => import("../components/components/Rooms/RoomsController")
  },
  data() {
    return {
      users: null
    };
  }
};
</script>
