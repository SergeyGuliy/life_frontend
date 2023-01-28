<template>
  <AuthWindow />
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "Auth",
  components: {
    AuthWindow: defineAsyncComponent(() =>
      import("@components/routes/Auth/AuthWindow.vue")
    ),
  },
};
</script>
