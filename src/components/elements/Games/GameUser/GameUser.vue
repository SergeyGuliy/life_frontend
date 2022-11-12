<template>
  <v-card class="GameUserData" v-if="$gameUserData">
    <v-card-title class="py-0">
      User data
      <v-spacer></v-spacer>
      {{ $user | getUserName }}
    </v-card-title>
    <v-card-title>
      Cash:
      <v-spacer></v-spacer>
      {{ $gameUserCash }} $
    </v-card-title>

    <GameUserWork />
  </v-card>
</template>

<script>
export default {
  name: "GameUserData",

  components: {
    GameUserWork: () => import("./GameUserWork")
  }
};
</script>
