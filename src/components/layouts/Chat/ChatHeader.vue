<template>
  <v-toolbar dark color="primary darken-1">
    <v-toolbar-title>Chat</v-toolbar-title>
    <v-btn
      @click="$emit('input', !value)"
      color="blue darken-2"
      absolute
      right
      bottom
    >
      <v-icon>
        mdi-close
      </v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: "ChatHeader",
  props: {
    value: {
      required: true,
      type: Boolean
    }
  }
};
</script>
