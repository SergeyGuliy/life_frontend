<template>
  <div>
    <v-btn depressed color="green" class="mr-1" x-small @click="buy">
      Buy
    </v-btn>
    <v-btn depressed color="red" x-small @click="sell"> Sell </v-btn>
  </div>
</template>

<script setup>
import { useModal } from "@composable";

const { openModal } = useModal();

const props = defineProps({
  item: { type: Object, required: true },
});

const buy = () =>
  openModal("Game/CryptoBuySell", {
    type: "BUY",
    name: props.item.name,
  }).catch(() => {});

const sell = () =>
  openModal("Game/CryptoBuySell", {
    type: "SELL",
    name: props.item.name,
  }).catch(() => {});
</script>
