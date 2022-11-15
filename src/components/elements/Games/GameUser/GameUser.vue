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
    <v-card-actions>
      <v-btn @click="openNews(0)" color="green" width="50%">
        Monthly cash flow
      </v-btn>
      <v-btn @click="openNews(1)" color="green" width="50%">
        Monthly news
        <v-badge color="orange" content="6" inline />
      </v-btn>
    </v-card-actions>
    <GameUserWork />
  </v-card>
</template>

<script>
export default {
  name: "GameUserData",

  components: {
    GameUserWork: () => import("./GameUserWork")
  },
  methods: {
    openNews(type) {
      this.$openModal("Game/News", { type }).catch(() => {});
    }
  }
};
</script>
