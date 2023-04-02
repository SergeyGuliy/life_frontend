<script setup>
import { onMounted } from "vue";
import { useVuetifyTheme } from "@composable";

const { setTheme } = useVuetifyTheme();

onMounted(() => setTheme(false));
</script>

<template>
  <v-app class="auth-layout">
    <slot />
  </v-app>
</template>

<style lang="scss">
.auth-layout {
  min-height: 100%;
  .v-application--wrap {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
