<script setup>
import { useAuth } from "../composable/useAuth";
import { useRouter } from "vue-router";

const router = useRouter();
const { refreshToken } = useAuth();

function goForward() {
  refreshToken().then(() => router.push({ name: "Home" }));
}
</script>

<template>
  <div class="Closer d-flex align-center justify-center flex-column">
    <h1>You can't use multiple windows</h1>
    <v-btn text @click="goForward">Go back</v-btn>
  </div>
</template>
