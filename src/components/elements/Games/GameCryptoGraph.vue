<template>
  <div>{{ crypto }}</div>
</template>

<script>
// import {api} from "@/utils/api";

export default {
  name: "GameCryptoGraph",

  data() {
    return {
      loading: true
    };
  },

  props: {
    crypto: {}
  },

  created() {
    console.log(this.$gameId);
    // api.games.crypto.getCrypto()
  }
};
</script>
