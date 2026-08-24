<script setup lang="ts">
import {useCharacterStore} from "~~/stores/characters.ts";
definePageMeta({ layout: 'forge' })

const route = useRoute()
const id = computed(() => route.params.id as string)
const store = useCharacterStore()

const entity = computed(() => store.byId[id.value])


</script>

<template>
  <div v-if="entity" class="mx-auto max-w-3xl">
    <UAlert v-if="!entity.data.species.key" color="warning" variant="subtle" title="Select a species first!" class="mb-2" />
    <UAlert v-if="!entity.data.archetype.key" color="warning" variant="subtle" title="Select an archetype first!" class="mb-2" />


    {{ entity.data.settingTier }}
    {{ entity.data.settingTier }}

  <UButton :to="`/forge/characters/${id}/builder/ascension/choose`">Select 1 packet</UButton>
  </div>
</template>

<style scoped>

</style>