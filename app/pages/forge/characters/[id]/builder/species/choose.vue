<script setup lang="ts">
import {useCharacterStore} from "~~/stores/characters.ts";
import {breakpointsTailwind, useBreakpoints} from "@vueuse/core";

const breakpoints = useBreakpoints(breakpointsTailwind)
const isSmallScreen = breakpoints.smallerOrEqual('sm') // Returns a reactive boolean

definePageMeta({ layout: 'forge' })

const route = useRoute()
const id = computed(() => route.params.id as string)
const store = useCharacterStore()

const entity = computed(() => store.byId[id.value])

const { data: species } = await useAsyncData(
    'species',
    (_nuxtApp, { signal }) => $fetch('/api/species', {
      signal,
      query: { source: entity.value?.data.enabledBooks.join(',') || '' }
    }),
)

const search = ref('')
const filteredSpecies = computed(() => {
  if (!species.value) return []
  const q = search.value.trim().toLowerCase()
  if (!q) return species.value
  return species.value.filter(item => item.name.toLowerCase().includes(q))
})

function selectSpecies(species: Species) {
  if (!entity.value) return
  console.info('Set Character Species', species.name)
  entity.value.data.species = {
    key: species.key,
    label: species.name,
    cost: species.costs.species,
  }
  store.scheduleSave(entity.value.id)
  showSpeciesModal.value = false
  navigateTo(`/forge/characters/${id.value}/builder/species/manage`)
}

const showSpeciesModal = ref(false)
const previewSpecies = ref<Species|null>(null)

function updateAndShowSpeciesPreview(species: Species) {
  console.info('Species Selected, open preview', species)
  previewSpecies.value = species
  showSpeciesModal.value = true
}

</script>

<template>
  <div class="mx-auto max-w-xl">
    <h1 class="font-bold text-2xl">Select a Species</h1>

    <UInput 
        v-model="search"
        icon="i-lucide-search"
        placeholder="Search by name"
        :ui="{ base: 'w-full' }"
        class="w-full"

    >
      <template v-if="search?.length" #trailing>
        <UButton
            color="neutral"
            variant="link"
            size="sm"
            icon="i-lucide-circle-x"
            aria-label="Clear input"
            @click="search = ''"
        />
      </template>
    </UInput>

    <UModal
        v-if="previewSpecies"
        v-model:open="showSpeciesModal"
        title="Confirm Species"
        :overlay="true"
        :fullscreen="isSmallScreen"
        :ui="{ content: 'max-w-2xl', footer: 'justify-between' }"
    >
      <template #body>
        <ForgeSpeciesPreview
            :species="previewSpecies"
            :ui="{ footer: 'justify-between' }"
        />
      </template>
      <template #footer>
        <UButton color="error" variant="subtle" @click="showSpeciesModal = false">Cancel</UButton>
        <UButton color="primary" @click="selectSpecies(previewSpecies)">Select Species</UButton>
      </template>
    </UModal>

    <UCard :ui="{ body: 'flex flex-col gap-2 p-0 sm:p-0 ' }" class="mt-4" >
      <div
          v-for="item in filteredSpecies"
          :key="item.key"
          class="hover:bg-black/10 w-min-full px-2 py-1 flex flex-row justify-between items-center"
          @click="updateAndShowSpeciesPreview(item)"
      >
        <UUser
            size="2xl"
            :avatar="{ src: `/img/avatars/species/${item.key}.png`}"
            :name="item.name"
            :description="item.hint"
            :ui="{ description: 'text-sm' }"
        >
          <template #name>
            {{ item.name }}
            <UBadge v-if="item.source.key !== 'core'" variant="subtle" color="info" class="ml-1 uppercase" size="sm">{{ item.source.key }}</UBadge>
          </template>
        </UUser>

        <UFieldGroup>
          <UBadge>{{ item.cost }}</UBadge>
          <UBadge variant="subtle">XP</UBadge>
        </UFieldGroup>
      </div>
    </UCard>
  </div>
</template>

<style scoped>

</style>