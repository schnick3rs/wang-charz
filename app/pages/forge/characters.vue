<script setup lang="ts">
import type {BreadcrumbItem} from "@nuxt/ui";

const crumbs = ref<BreadcrumbItem[]>([
  {
    label: '',
    icon: 'i-lucide-home',
    to: '/'
  },
  {
    icon: 'i-game-icons-gear-hammer',
    label: 'Forge',
    to: '/forge',
    exact: true
  },
  {
    label: 'Agents',
    to: '/forge/characters',
    exact: true
  },
])

const numberOfCharacters = ref(3)

</script>

<template>

  <DoomBreadcrumb :items="crumbs" />

  <div class="border-b-4 pb-2 border-b-orange-600 mb-4">
    <h1 class="text-3xl sm:text-4xl text-pretty font-bold text-highlighted inline">My Agents</h1>
    <span>{{ numberOfCharacters }} Slots</span>
  </div>

  <div>
    <UButton>Create new Agent</UButton>
    <UButton>Import Agent</UButton>
  </div>

  <div>
    <CharacterCard ></CharacterCard>
  </div>

</template>

<style scoped>

</style>