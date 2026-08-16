<script setup lang="ts">
import {useCharacterStore} from "~~/stores/characters.ts";

definePageMeta({ layout: 'forge' })

const route = useRoute()
const id = computed(() => route.params.id as string)
const store = useCharacterStore()

const entity = computed(() => store.byId[id.value])

const { data: species } = await useAsyncData(
    'archetypes',
    (_nuxtApp, { signal }) => $fetch('/api/archetypes', {
      signal,
      query: { source: entity.value?.data.enabledBooks.join(',') || '' }
    }),
    {
      transform: (data) => {
        return data
            .filter(item => item.tier <= entity.value.data.settingTier)
            .filter(item => item.species.some((s) => s.key.includes(entity.value.data.speciesKey) ))
      }
    }
)

const search = ref('')
const filteredArchetypes = computed(() => {
  if (!species.value) return []
  const q = search.value.trim().toLowerCase()
  if (!q) return species.value
  return species.value.filter(item => item.name.toLowerCase().includes(q))
})
</script>

<template>
  <div class="mx-auto max-w-3xl">
    <h1 class="font-bold text-2xl">Select an Archetype</h1>

    <UAlert color="warning" v-if="!entity.data.speciesKey" variant="subtle" title="Select a species first!" class="mb-2" />

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

    <UCard :ui="{ body: 'flex flex-col gap-2 p-0 sm:p-0 ' }" class="mt-4">
      <div v-for="item in filteredArchetypes" :key="item.key" class="hover:bg-black/10 w-min-full px-2 py-1 flex flex-row justify-between items-center">
        <UUser
            size="2xl"
            :avatar="{ src: `/img/avatars/archetype/${item.key}.png`}"
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
          <UFieldGroup>
            <UBadge>{{ item.cost }}</UBadge>
            <UBadge variant="subtle">XP</UBadge>
          </UFieldGroup>
          <UFieldGroup class="ml-2">
            <UBadge variant="subtle" color="error">Tier</UBadge>
            <UBadge color="error">{{ item.tier }}</UBadge>
          </UFieldGroup>
        </div>
      </div>
    </UCard>
  </div>
</template>

<style scoped>

</style>