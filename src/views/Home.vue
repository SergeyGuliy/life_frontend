<template>
  <Grid>
    <template #leftCol> </template>
    <template #rightCol>
      <Title :title="$t('pages.rooms.roomsList')" />
      <RoomsController />
    </template>
  </Grid>
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
