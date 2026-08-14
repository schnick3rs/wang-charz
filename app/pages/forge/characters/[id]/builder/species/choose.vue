<script setup lang="ts">
import {useCharacterStore} from "~~/stores/characters.ts";

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

    <UCard :ui="{ body: 'flex flex-col gap-2 p-0 sm:p-0 ' }" class="mt-4">
      <div v-for="item in filteredSpecies" :key="item.key" class="hover:bg-black/10 w-min-full px-2 py-1 flex flex-row justify-between items-center">
        <UUser
            size="2xl"
            :avatar="{ src: `/img/avatars/species/${item.key}.png`}"
            :name="item.name"
            :description="item.hint"
            :ui="{ description: 'text-sm' }"
        >
          <template #name>
            {{ item.name }}
            <UBadge v-if="item.source.key !== 'core'" variant="subtle" color="info" class="ml-1" size="sm">{{ item.source.key }}</UBadge>
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