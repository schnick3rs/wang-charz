<script setup lang="ts">
import {useCharacterStore} from "~~/stores/characters.ts";

definePageMeta({ layout: 'forge' })

const route = useRoute()
const id = computed(() => route.params.id as string)
const store = useCharacterStore()

const entity = computed(() => store.byId[id.value])

const { data: ascensionPackages } = await useAsyncData(
    'ascension-packages',
    (_nuxtApp, { signal }) => $fetch('/api/ascension-packages', {
      signal,
      query: { source: entity.value?.data.enabledBooks.join(',') || '' }
    }),
)

const search = ref('')
const filteredAscensionPackages = computed(() => {
  if (!ascensionPackages.value) return []
  const q = search.value.trim().toLowerCase()
  if (!q) return ascensionPackages.value
  return ascensionPackages.value.filter(item => item.name.toLowerCase().includes(q))
})

const showArchetypeModal = ref(false)
const previewAscensionPackage = ref<AscensionPackage|null>(null)

// TODO compute
const effectiveCharacterTier = ref(3);

const targetTierOptions = computed(() => {
  const from = Math.max(effectiveCharacterTier.value + 1);
  const to = entity.value.data.settingTier;
  return from <= to
      ? Array.from({ length: to - from + 1 }, (_, i) => from + i)
      : [];
})

function selectArchetype(archetypeKey: string) {
  console.info('Add Acension Package', archetypeKey)
  store.scheduleSave(entity.value.id)
  showArchetypeModal.value = false
  navigateTo(`/forge/characters/${id.value}/builder/ascension/manage`)
}

function updateAndShowArchetypePreview(species: AscensionPackage) {
  console.info('Archetype Ascension Selected, open preview', species)
  previewAscensionPackage.value = species
  showArchetypeModal.value = true
}

</script>

<template>
  <div class="mx-auto max-w-3xl">
    <h1 class="font-bold text-2xl">Select an Ascension Package</h1>

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
        v-if="previewAscensionPackage"
        v-model:open="showArchetypeModal"
        title="Confirm Ascension Package"
        :ui="{ content: 'max-w-2xl', footer: 'justify-between' }"
    >
      <template #body>
        <ForgeAscensionPackagePreview :ascension-package="previewAscensionPackage" />
      </template>
      <template #footer>
        <UButton color="error" variant="subtle" @click="showArchetypeModal = false">Cancel</UButton>
        <UFieldGroup>
          <UBadge variant="subtle">{{ effectiveCharacterTier }}</UBadge>
          <UBadge icon="i-mdi-arrow-right-bold" variant="soft"></UBadge>
          <USelect :items="targetTierOptions" :model-value="entity.data.settingTier" />
        </UFieldGroup>
        <UButton color="primary" @click="selectArchetype(previewAscensionPackage.key)">Select Ascension Package</UButton>
      </template>
    </UModal>

    <UCard :ui="{ body: 'flex flex-col gap-2 p-0 sm:p-0' }" class="mt-4">
      <div
          v-for="item in filteredAscensionPackages"
          :key="item.key"
          class="hover:bg-black/10 w-min-full px-2 py-1 flex flex-row justify-between items-center"
          @click="updateAndShowArchetypePreview(item)"
      >
        <UUser
            size="2xl"
            :avatar="{ src: `/img/avatars/ascension/${item.key}.png`}"
            :name="item.name"
            :description="item.hint"
            :ui="{ description: 'text-sm' }"
        >
          <template #name>
            {{ item.name }}
            <UBadge v-if="item.source.key !== 'core'" variant="subtle" color="info" class="ml-1 uppercase" size="sm">{{ item.source.key }}</UBadge>
          </template>
        </UUser>

        <div class="text-nowrap">
          <UFieldGroup class="ml-2">
            <UBadge variant="subtle" color="primary">New Tier x</UBadge>
            <UBadge color="primary">{{ item.costPerTier }}</UBadge>
          </UFieldGroup>
        </div>
      </div>
    </UCard>
  </div>
</template>

<style scoped>

</style>