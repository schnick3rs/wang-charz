<script setup lang="ts">
import type {BreadcrumbItem} from "@nuxt/ui";
import {useCharacterStore} from "~~/stores/characters.ts";
import { storeToRefs } from 'pinia'
import { nameByRace } from "fantasy-name-generator";
import {breakpointsTailwind, useBreakpoints} from "@vueuse/core";

const breakpoints = useBreakpoints(breakpointsTailwind)
const isSmallScreen = breakpoints.smallerOrEqual('sm') // Returns a reactive boolean

const description = 'The Forge allows you to create and organize multiple characters for the Wrath and GloryRoleplaying game. Create, manage and view your characters online.'

useSeoMeta({
  title: "Character Builder for Wrath & Glory",
  titleTemplate: '%s | Forge',
  description: description,
  ogImage: 'https://primaris.doctors-of-doom.com/img/artwork_abstract.jpg',
  ogTitle: 'Character Builder for Wrath & Glory',
  ogDescription: description,

  twitterCard: 'summary_large_image',
  twitterImage: 'https://primaris.doctors-of-doom.com/img/artwork_forge_twitter.jpg',
  twitterTitle: 'Character Builder for Wrath & Glory | Forge',
  twitterDescription: description,
})

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


const characterStore = useCharacterStore()
const { characterList, hydrated } = storeToRefs(characterStore)
const { createCharacter, hydrate, deleteCharacter } = characterStore

const user = useSupabaseUser()

onMounted(() => {
  if (!hydrated.value) {
    hydrate()
  }
})

async function newChar() {
  const user = useSupabaseUser()
  if (!user.value) return

  try {
    const char = CharacterDataSchema.parse({
      name: nameByRace('human')
    })
    createCharacter(char)
  } catch (e) {
    console.error('Could not create character', e)
  }
}

const deleteTextConfirmation = ref('')
const deleteBooleanConfirmation = ref(false)
const deleteEnabled = computed(() => deleteTextConfirmation.value === 'DELETE' || deleteBooleanConfirmation.value)

async function deleteChar(id: string) {
  if (!deleteEnabled.value) return

  const user = useSupabaseUser()
  if (!user.value) return

  try {
    await deleteCharacter(id)
    deleteTextConfirmation.value = ''
  } catch (e) {
    console.error('Could not delete character', e)
  }
}

</script>

<template>

  <DoomBreadcrumb :items="crumbs" />

  <UCard v-if="!user">
    <UPageHero
        title="Create an Account"
        description="You need to create an account to manage your characters"
        :links="[
          {
            label: 'Sign up',
            to: '/login',
          }
      ]"
    />
  </UCard>

  <section v-else>

    <div class="border-b-4 pb-2 border-b-orange-600 mb-4">
      <h1 class="text-3xl sm:text-4xl text-pretty font-bold text-highlighted inline">My Characters</h1>
    </div>

    <div class="mb-4 flex flex-row space-x-2">
      <UButton @click="newChar">Create new Agent</UButton>
      <UButton>Import Agent</UButton>
    </div>

    <div v-if="!hydrated" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-4">
      <UCard class="flex items-center gap-4"  v-for="i in 3" :key="i">
        <USkeleton class="size-12 rounded-full" />

        <div class="grid gap-2">
          <USkeleton class="h-4 w-[250px]" />
          <USkeleton class="h-4 w-[200px]" />
        </div>
      </UCard>
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

          <UModal
              title="Delete this Agent?"
              :description="`Poor ${c.data.name}, their time has come. Goodbye old friend...`"
              :ui="{ footer: 'justify-between' }"
          >

            <UButton variant="ghost" color="error" >Delete</UButton>

            <template #body>
              <template v-if="isSmallScreen">
                <UAlert class="mb-4" color="warning" variant="subtle" :title="`To delete ${c.data.name} enable the checkbox below`"></UAlert>
                <UCheckbox v-model="deleteBooleanConfirmation" class="w-full" label="Click here to confirm the deletion" />
              </template>
              <template v-else>
                <UAlert class="mb-4" color="warning" variant="subtle" :title="`To delete ${c.data.name} type the word DELETE into the field below`"></UAlert>
                <UInput v-model="deleteTextConfirmation" class="w-full" />
              </template>
            </template>

            <template #footer="{ close }">
              <UButton label="Cancel" color="neutral" variant="outline" @click="close" />
              <UButton
                  variant="solid"
                  :color="deleteEnabled ? 'error' : 'neutral'"
                  :disabled="!deleteEnabled"
                  @click="deleteChar(c.id)"
              >
                Delete
              </UButton>
            </template>
          </UModal>

        </template>
      </UCard>
    </div>
  </section>

</template>

<style scoped>

</style>