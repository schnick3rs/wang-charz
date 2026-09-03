<script setup lang="ts">
import {useCharacterStore} from "~~/stores/characters.ts";
import {
  attributeRepository,
  skillRepository,
  type Trait,
  traitRepository,
} from "#shared/utils/stats.ts";
import {type Prerequisite } from "#shared/types/archetype.ts";

definePageMeta({ layout: 'forge' })

const route = useRoute()
const id = computed(() => route.params.id as string)
const store = useCharacterStore()
const entity = computed(() => store.byId[id.value])

// Deep-watch the sheet data and let the store's existing debounce handle
// persistence — avoids writing an updateCharacter(id, { field }) call for
// every one of the sheet's many inputs.
watch(
    () => entity.value?.data,
    () => {
      if (entity.value) store.scheduleSave(id.value)
    },
    { deep: true }
)

// Flush any pending debounced save immediately when leaving the page,
// so a fast navigation-away doesn't lose the last edit.
onBeforeRouteLeave(async () => {
  if (entity.value) await store.saveNow(id.value)
})

const { data: species } = await useAsyncData(
    `species-${entity.value.data.species.key}`,
    (_nuxtApp, { signal }) => $fetch(`/api/species/${entity.value.data.species.key}`, { signal }),
    {
      pick: [ 'commonNames' ],
    }
)


const { data: faction } = await useAsyncData(
    `faction-${entity.value.data.faction.key}`,
    (_nuxtApp, { signal }) => $fetch(`/api/factions/by-name`, { signal, query: { name: entity.value.data.faction.label } } ),
    {
      transform: (data) => {
        return data[0]
      }
    }
)

const groupedBackgroundSection = computed(() => {
  if (!faction.value?.backgroundSection) return []

  return Object.entries(
      faction.value.backgroundSection.reduce((acc, item) => {
        (acc[item.type] ??= []).push(item)
        return acc
      }, {})
  ).map(([type, items]) => ({ type, items }))
})

/**
 * TODO names by faction (e.g. space wolves, harlequinn)
 */
function randomName() {
  const names = species.value.commonNames || ['Hansi']
  return names[Math.floor(Math.random() * names.length)]
}
</script>

<template>
  <div class="mx-auto max-w-3xl">

    <h1 class="font-bold text-2xl mb-2">Background</h1>

    <section v-if="entity">

      <UFormField label="Name" class="w-full w-min-full" :ui="{ label: 'text-lg font-semibold' }">
        <UInput v-model="entity.data.name" placeholder="Enter your name" >
          <template  #trailing>
            <UButton
                color="neutral"
                variant="link"
                size="sm"
                icon="i-game-icons-perspective-dice-six-faces-random"
                aria-label="Random Name"
                @click="entity.data.name = randomName()"
            />
          </template>
        </UInput>

      </UFormField>

      <!-- backgrounds -->
      <UCard title="Background Options" :description="faction.name" :ui="{ body: 'flex flex-col gap-2'}">

        <div v-for="group in groupedBackgroundSection" :key="group.type" class="mb-2">
          <h3 class="font-bold mb-2">{{ group.type }}</h3>
          <URadioGroup  :items="group.items" label-key="title" description-key="snippet" value-key="key" />
        </div>
      </UCard>

      <!-- Objectives -->
      <UCard title="Objectives" :description="faction.name">
        <ol>
          <li
              v-for="(objective, index) in faction.objectives"
              :key="index"
              class="list-decimal ml-4"
          >
            {{objective}}
          </li>
        </ol>
      </UCard>

      <UCard title="Buy more wealth">
        Core pg. 38 start with TIER buy up to 4 for 1:1 XP at start
      </UCard>

      <UCard title="Known Languages" description="Can be bought during character creation">
        <UBadge color="neutral" variant="subtle">Low Gothic</UBadge>
        <UBadge color="neutral" variant="subtle">Low Gothic</UBadge>

        <UFormField label="Add Language">
          <USelect :items="[{key:'s', label: 'ss'}]" placeholder="Select language" trailing-icon=""></USelect>
        </UFormField>
      </UCard>

      <UCard title="Notes">
        <UTextarea class="w-full"></UTextarea>
      </UCard>

    </section>

  </div>
</template>

<style scoped>

</style>