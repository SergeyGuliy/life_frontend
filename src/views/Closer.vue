<script setup>
import { useAuth, useMyRouter } from "@composable";

const { refreshToken } = useAuth();
const { routerPush } = useMyRouter();

const goForward = () => refreshToken().then(() => routerPush({ name: "Home" }));
</script>

<template>
  <div class="Closer d-flex align-center justify-center flex-column">
    <h1>You can't use multiple windows</h1>
    <v-btn text @click="goForward">Go back</v-btn>
  </div>
</template>
