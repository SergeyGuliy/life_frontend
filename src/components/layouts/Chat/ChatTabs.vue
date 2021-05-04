<template>
  <v-tabs v-model="activeChatLocal">
    <v-tabs-slider color="yellow"></v-tabs-slider>

    <v-tab
      v-for="(chatTab, index) in chatTabs"
      :key="index"
      class="ma-0"
      :href="`#${chatTab}`"
    >
      {{ chatTab }}
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  name: "ChatTabs",
  props: {
    chatTabs: {
      required: true,
      type: Array
    },
    value: {
      required: true,
      type: String
    }
  },
  computed: {
    activeChatLocal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  }
};
</script>
