<script setup lang="ts">
import {useCharacterStore} from "~~/stores/characters.ts";
definePageMeta({ layout: 'forge' })

const route = useRoute()
const id = computed(() => route.params.id as string)
const store = useCharacterStore()

const entity = computed(() => store.byId[id.value])

const disableAdditionalAscensions = computed(() => {
  if (!entity.value) return true
  return entity.value.data.ascensions.length > 1
})

</script>

<template>
  <div v-if="entity" class="mx-auto max-w-3xl flex flex-col gap-4">

    <h1 class="font-bold text-2xl mb-2">Ascensions</h1>

    <UAlert v-if="!entity.data.species?.key" color="warning" variant="subtle" title="Select a species first!" class="mb-2" />
    <UAlert v-if="!entity.data.archetype?.key" color="warning" variant="subtle" title="Select an archetype first!" class="mb-2" />

    <div
        v-for="ascension in entity.data.ascensions"
        :key="ascension.key"
    >

      <ForgeAscensionManageView
          :key="ascension.key"
          :entity-id="id"
          :ascension-package-key="ascension.key"
      />

    </div>

    <UAlert
        v-if="disableAdditionalAscensions"
        color="info"
        variant="subtle"
        title="Your character has reached a Tier sufficient for the Campaign"

        icon="i-heroicons-information-circle"
    />

    <UButton
        :to="`/forge/characters/${id}/builder/ascension/choose`"
        icon="i-heroicons-plus-20-solid"
        variant="subtle"
        :ui="{ base: 'py-8' }"
        block
        size="xl"
        :disabled="disableAdditionalAscensions"
        :color="disableAdditionalAscensions ? 'neutral' : 'primary'"
    >
      Add an Ascension Package
    </UButton>

  </div>
</template>

<style scoped>

</style>