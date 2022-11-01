<template>
  <v-card class="GameUserData" v-if="userData">
    <v-card-title class="py-0">
      User data
      <v-spacer></v-spacer>
      {{ userData.userName }}
    </v-card-title>

    <GameUserWork :work="userData.work" />

    <v-card-actions>
      <!--      <v-btn @click="skipRound" block>-->
      <!--        Skip round-->
      <!--      </v-btn>-->
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "GameUserData",

  props: {
    userData: {}
  },

  components: {
    GameUserWork: () => import("./GameUserWork")
  }
};
</script>

<style scoped></style>
