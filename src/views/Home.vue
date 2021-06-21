<template>
  <div class="home container__inner">
    <v-row>
      <v-col cols="6">
      </v-col>
      <v-col cols="6">
        <RoomsController />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
    RoomsController: () =>
      import("../components/components/Rooms/RoomsController")
  },
  data() {
    return {
      users: null
    };
  }
};
</script>
