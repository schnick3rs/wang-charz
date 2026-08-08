<script setup lang="ts">
import type {BreadcrumbItem} from "@nuxt/ui";

const { items } = defineProps<{
  items: BreadcrumbItem[]
}>()
</script>

<template>
  <UCard class="mb-4" :ui="{ body: 'p-1 sm:p-2' }">
    <UBreadcrumb :items="items" />
  </UCard>
</template>

<style scoped>

</style>