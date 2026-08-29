<script setup lang="ts">
import {useCharacterStore} from "~~/stores/characters.ts";

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

</script>

<template>
  <div class="mx-auto max-w-3xl">

    <h1 class="font-bold text-2xl mb-2">Manage Wargear</h1>


    <!-- Wargear -->
    <div v-if="entity" class="mt-4 mb-4">
      <h3 class="font-light text-sm">Owned Wargear</h3>
      <USeparator class="mb-2" />
      <div class="flex flex-col gap-2">
        <div v-for="gear in entity.data.wargear" :key="gear.id" class="hover:bg-black/10 p-2">
          <pre>{{gear}}</pre>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>