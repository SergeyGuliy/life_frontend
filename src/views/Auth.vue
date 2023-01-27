<template>
  <AuthWindow />
</template>

<script>
export default {
  name: "Auth",
  components: {
    AuthWindow: () => import("@components/routes/Auth/AuthWindow.vue")
  }
};
</script>
