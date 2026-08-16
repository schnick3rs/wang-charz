<script setup lang="ts">
import {useCharacterStore} from "~~/stores/characters.ts";

definePageMeta({ layout: 'forge' })

const route = useRoute()
const id = computed(() => route.params.id as string)
const store = useCharacterStore()

const entity = computed(() => store.byId[id.value])

const { data: species } = await useAsyncData(
    'specie',
    (_nuxtApp, { signal }) => $fetch(`/api/species/${entity.value.data.speciesKey}`, { signal }),
)
</script>

<template>

  <div v-if="species" class="mx-auto max-w-3xl">

    <div class="flex flex-row justify-between mb-2">
      <div class="flex flex-col">
        <span class="text-2xl font-bold mb-2">{{ species.name }}</span>
        <span>{{ species.hint }}</span>

      </div>
      <div>
        <NuxtImg :src="`/img/avatars/species/${species.key}.png`" class="w-30 h-30 object-contain rounded-lg" />
        <UButton variant="ghost" color="info">Change Species</UButton>
      </div>
    </div>

    <!-- features -->
    <template v-if="species.speciesFeatures.length > 0">

      <div class="mb-4">
        <h3 class="font-light text-sm">Species Abilities</h3>
        <USeparator class="mb-2" />

        <div class="flex flex-col gap-2">
          <div v-for="feature in species.speciesFeatures" :key="feature.name">
            <strong>{{ feature.name }}</strong>
            <div v-if="feature.description" v-html="feature.description" />
            <div v-else><p>{{ feature.snippet}}</p></div>

            <pre>{{feature}}</pre>
          </div>
        </div>
      </div>
    </template>

    {{species}}
  </div>
</template>

<style scoped>

</style>