<template>
  <div>{{ crypto }}</div>
</template>

<script>
// import {api} from "@/utils/api";

import { api } from "@/utils/api";

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
    api.games.crypto
      .getCrypto({
        name: this.crypto.name,
        gameId: this.$gameId
      })
      .then(data => {
        console.log(data);
        this.loading = false;
      });
  }
};
</script>
