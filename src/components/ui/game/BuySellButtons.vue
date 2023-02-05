<template>
  <div>
    <v-btn depressed color="green" class="mr-1" x-small @click="buy">
      Buy
    </v-btn>
    <v-btn depressed color="red" x-small @click="sell">
      Sell
    </v-btn>
  </div>
</template>

<script>
import {useModal} from "../../../composable/useModal";

export default {
  name: "BuySellButtons",

  props: {
    item: {
      type: Object,
      required: true
    }
  },

  setup() {
    const {openModal} =useModal()
    return {openModal}
  },

  methods: {
    async buy() {
      await this.openModal("Game/CryptoBuySell", {
        type: "BUY",
        name: this.item.name
      }).catch(() => {});
    },
    async sell() {
      await this.openModal("Game/CryptoBuySell", {
        type: "SELL",
        name: this.item.name
      }).catch(() => {});
    }
  }
};
</script>
