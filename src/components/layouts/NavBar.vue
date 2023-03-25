<script setup>
import { defineEmits, defineProps, ref } from "vue";

import { LOCALES_WITH_KEYS } from "@enums";
import { useLocale, useVuetifyTheme, useAuth } from "@composable";

const emit = defineEmits(["update:modelValue"]);
defineProps({
  modelValue: { type: Boolean, required: true },
});

const { changeLocale } = useLocale();
const { logOutMiddleware } = useAuth();
const { toggleTheme } = useVuetifyTheme();

const localesWithKeys = ref(LOCALES_WITH_KEYS);
</script>

<template>
  <v-app-bar app class="NavBar">
    <v-btn icon @click="emit('update:modelValue', !modelValue)">
      <v-icon icon="mdi-menu" />
    </v-btn>

    <v-spacer />

    <v-menu offset-y class="lang-selector" auto>
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <v-icon>mdi-translate</v-icon>
        </v-btn>
      </template>
      <v-list class="lang-selector__list">
        <v-list-item
          link
          v-for="(item, index) in localesWithKeys"
          :key="index"
          @click="changeLocale(item.key)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-btn icon @click="toggleTheme">
      <v-icon>mdi-invert-colors</v-icon>
    </v-btn>

    <v-btn icon @click="logOutMiddleware">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>
