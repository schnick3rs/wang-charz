<script setup lang="ts">
import type {BreadcrumbItem} from "@nuxt/ui";
import {useCharacterStore} from "~~/stores/characters.ts";

import { storeToRefs } from 'pinia'
import { nameByRace } from "fantasy-name-generator";

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
    label: 'Characters',
    to: '/forge/my-characters',
    exact: true
  },
])

const numberOfCharacters = ref(3)

const characterStore = useCharacterStore()
const { characterList, hydrated } = storeToRefs(characterStore)
const { createCharacter, hydrate } = characterStore

onMounted(() => {
  hydrate()
})

async function newChar() {
  const user = useSupabaseUser()
  if (!user.value) return

  const char = CharacterDataSchema.parse({
    name: nameByRace('human')
  })

  createCharacter(char)
}

</script>

<template>

  <DoomBreadcrumb :items="crumbs" />

  <div class="border-b-4 pb-2 border-b-orange-600 mb-4">
    <h1 class="text-3xl sm:text-4xl text-pretty font-bold text-highlighted inline">My Characters</h1>
    <span>{{ numberOfCharacters }} Slots</span>
  </div>

  <div class="mb-4 flex flex-row space-x-2">
    <UButton @click="newChar">Create new Agent</UButton>
    <UButton>Import Agent</UButton>
  </div>

  <div v-if="!hydrated">
    <div class="flex items-center gap-4">
      <USkeleton class="size-12 rounded-full" />

      <div class="grid gap-2">
        <USkeleton class="h-4 w-[250px]" />
        <USkeleton class="h-4 w-[200px]" />
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-4">
    <UCard
        v-for="c in characterList" :key="c.id"
        :title="c.data.name"
        :description="c.data.species?.label + ' · ' + c.data.archetype?.label"
        :ui="{
          header: 'p-3 sm:px-3 flex flex-row gap-4',
          footer: 'p-3 sm:px-3 flex flex-row flex-nowrap justify-between',
        }"
    >
      <template #header>
          <NuxtImg v-if="c.data.archetype?.key" :src="`/img/avatars/archetype/${c.data.archetype.key}.png`" class="w-24 h-24 shrink-0 object-cover object-center rounded-lg" />
          <NuxtImg v-else-if="c.data.species?.key" :src="`/img/avatars/species/${c.data.species.key}.png`" class="w-24 h-24 shrink-0 object-cover object-center rounded-lg" />
          <NuxtImg v-else :src="`/img/avatar_placeholder.png`" class="w-24 h-24 shrink-0 object-cover object-center rounded-lg" />
          <div>
            <div class="text-highlighted font-semibol">{{ c.data.name }}</div>
            <div class="mt-1 text-muted text-s">{{ (c.data.species?.label || '?') + ' · ' + (c.data.archetype?.label || '?') }}</div>
            <div class="mt-1 text-muted text-s">Tier {{c.data.settingTier}} · Rank  {{ c.data.rank }} · 0 / {{ c.data.settingTier * 100 }} XP</div>
          </div>
      </template>
      <template #footer>
        <UButton variant="ghost" color="info" :to="`/forge/characters/${c.id}`">View</UButton>
        <UButton variant="ghost" color="info" :to="`/forge/characters/${c.id}/builder/setting`">Edit</UButton>
        <UButton variant="ghost" color="info">Share</UButton>
        <UButton variant="ghost" color="error">Delete</UButton>
      </template>
    </UCard>
  </div>

</template>

<style scoped>

</style>