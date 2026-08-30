<script setup lang="ts">
import {useCharacterStore} from "~~/stores/characters.ts";
import {stringToKebab} from "#server/data/utils.ts";

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

const { data: psychicDisciplines } = await useAsyncData(
    'psychic-disciplines-sourced',
    (_nuxtApp, { signal }) => $fetch('/api/psychic-disciplines', {
      signal,
      query: { source: entity.value?.data.enabledBooks.join(',') || '' }
    }),
)

</script>

<template>
  <div class="mx-auto max-w-4xl">

    <h1 class="font-bold text-2xl mb-2 flex flex-row justify-between">
      Review Psychic Disciplines
      <UButton variant="subtle" color="info" icon="i-game-icons-card-exchange" :to="`/forge/characters/${entity.id}/builder/psychic/powers`" />
    </h1>

    <UCard :ui="{ body: 'flex flex-col gap-2 p-0 sm:p-0 ' }" class="mt-4" >
      <div
          v-for="discipline in psychicDisciplines"
          :key="discipline.key"
          class="hover:bg-black/10 w-min-full px-2 py-1 flex flex-row justify-between items-center"
      >
        <UUser
            :avatar="{ src: `/img/avatars/psychic-disciplines/${stringToKebab(discipline.name)}.png`}"
            size="lg"
            color="neutral"
            variant="subtle"
            :name="discipline.name"
            :description="discipline.snippet"
        >
        </UUser>
      </div>
    </UCard>

  </div>
</template>

<style scoped>

</style>