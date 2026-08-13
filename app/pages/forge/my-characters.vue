<script setup lang="ts">
import type {BreadcrumbItem} from "@nuxt/ui";
import {useCharacterStore} from "~~/stores/characters.ts";
import {CharacterSchema} from "#shared/types/character.schema.ts";

import { storeToRefs } from 'pinia'
import { nameByRace } from "fantasy-name-generator";
import type {Database, Json, TablesInsert} from "~~/types/database.types.ts";

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
    to: '/forge/my-characters',
    exact: true
  },
])

const numberOfCharacters = ref(3)

const characterStore = useCharacterStore()
const { characters } = storeToRefs(characterStore)
const { addCharacter } = characterStore

async function newChar() {
  const user = useSupabaseUser()
  if (!user.value) {
    return
  }

  const supabase = useSupabaseClient<Database>()

  const char = CharacterSchema.parse({
    ownerId: user.value.sub,
    name: nameByRace('human')
  })

  const payload: TablesInsert<'characters'> = {
    id: crypto.randomUUID(),
    data: char as unknown as Json, // Zod's Character type isn't structurally Json — safe cast, it's plain JSON-serializable data
    // created_at, updated_at, is_deleted, user_id all have DB defaults — omit them
  }

  const { data, error } = await supabase
      .from('characters')
      .insert(payload)
      .select()
      .single()

  if (error) {
    console.error(error)
    return
  }

  console.log(data)


  addCharacter(char)
}

</script>

<template>

  <DoomBreadcrumb :items="crumbs" />

  <div class="border-b-4 pb-2 border-b-orange-600 mb-4">
    <h1 class="text-3xl sm:text-4xl text-pretty font-bold text-highlighted inline">My Agents</h1>
    <span>{{ numberOfCharacters }} Slots</span>
  </div>

  <div class="mb-4 flex flex-row space-x-2">
    <UButton @click="newChar">Create new Agent</UButton>
    <UButton>Import Agent</UButton>
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
    <UCard
        v-for="c in characters" :key="c.id"
        :title="c.name"
        :description="c.speciesKey"
        :ui="{ footer: 'flex flex-row flex-nowrap justify-between' }"
    >
      <template #footer>
        <UButton variant="ghost" color="info" :to="`/forge/characters/${c.id}`">View</UButton>
        <UButton variant="ghost" color="info" :to="`/forge/characters/${c.id}/builder`">Edit</UButton>
        <UButton variant="ghost" color="info">Share</UButton>
        <UButton variant="ghost" color="error">Delete</UButton>
      </template>
    </UCard>
  </div>

</template>

<style scoped>

</style>