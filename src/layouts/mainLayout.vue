<template>
  <div class="my-wrapper">
    <SideBar :value="drawer" @updateDrawer="updateDrawer" />
    <NavBar :value="drawer" @updateDrawer="updateDrawer" />
    <v-main>
      <v-container>
        <slot />
      </v-container>
      <Chat />
    </v-main>
  </div>
</template>

<script>
export default {
  name: "mainLayout",
  components: {
    SideBar: () => import("../components/layouts/SideBar"),
    NavBar: () => import("../components/layouts/NavBar"),
    Chat: () => import("../components/layouts/Chat")
  },
  data() {
    return {
      drawer: false
    };
  },
  methods: {
    updateDrawer(value) {
      this.drawer = value;
    }
  }
};
</script>

<style lang="scss">
.my-wrapper {
  .v-main {
    min-height: 100%;
  }
  /*.container {*/
  /*  min-height: 100%;*/
  /*}*/
}
</style>
