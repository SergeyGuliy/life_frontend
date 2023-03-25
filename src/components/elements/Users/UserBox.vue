<script setup>
import { computed, defineProps, onMounted, ref } from "vue";

import UserInfo from "./UserInfo.vue";
import { useUsers } from "@composable";

const { myUser } = useUsers();

const props = defineProps({
  userData: { required: true, type: [Object, undefined] },
  showUserRoomInfo: { default: () => false, type: Boolean },
});

const timestamp = ref(new Date());

const userDataLocal = computed(() => {
  const userData = this.$filters.dictGetUserById(this.userData?.userId);
  if (timestamp.value) return userData;
  return userData;
});
const isYou = computed(() => userDataLocal.value?.userId === myUser?.userId);
const userIdExists = computed(() => props.userData?.userId);

onMounted(() => {
  setInterval(() => (timestamp.value = new Date()), 1000);
});
</script>

<template>
  <v-card class="UserBox" v-if="userIdExists">
    <UserInfo :userData="userData" :showUserRoomInfo="showUserRoomInfo" />
    <v-card-actions>
      <slot name="actions" :userData="userDataLocal" :isYou="isYou"></slot>
    </v-card-actions>
  </v-card>
</template>
