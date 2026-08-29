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
)

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


    </section>

  </div>
</template>

<style scoped>

</style>