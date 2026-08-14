<script setup lang="ts">
import {useCharacterStore} from "~~/stores/characters.ts";

const route = useRoute();
const characterStore = useCharacterStore();
</script>

<template>
  <pre>
    {{character}}
  </pre>
</template>

<style scoped>

</style>