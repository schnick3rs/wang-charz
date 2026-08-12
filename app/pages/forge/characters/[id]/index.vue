<script setup lang="ts">
import {useCharacterStore} from "~~/stores/characters.ts";

const route = useRoute();
const characterStore = useCharacterStore();

const character = computed(() => characterStore.getCharacterById(route.params.id as string));

</script>

<template>
  <pre>
    {{character}}
  </pre>
</template>

<style scoped>

</style>