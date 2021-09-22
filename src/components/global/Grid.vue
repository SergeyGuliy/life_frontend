<template>
  <div class="grid">
    <v-row class="grid__row">
      <v-col class="px-1 grid__col grid__col--leftCol" :cols="leftCol[0]">
        <v-card class="pa-2 grid__card grid__card--leftCol pa-4">
          <slot name="leftCol"></slot>
        </v-card>
      </v-col>
      <v-col class="px-1 grid__col grid__col--rightCol" :cols="rightCol[0]">
        <v-card class="pa-2 grid__card grid__card--rightCol pa-4">
          <slot name="rightCol"></slot>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Grid",
  props: {
    leftCol: {
      default: () => [6],
      type: Array
    },
    rightCol: {
      default: () => [6],
      type: Array
    }
  }
};
</script>

<style lang="scss">
.grid {
  width: 100%;
  .grid__row {
    max-height: 100%;
    overflow: auto;
    height: 100%;
  }
  .grid__col {
    max-height: 100%;
    height: 100%;
  }
  .grid__card {
    max-height: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
