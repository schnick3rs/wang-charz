<script setup lang="ts">
import {useCharacterStore} from "~~/stores/characters.ts";
const { t } = useI18n()
definePageMeta({ layout: 'forge' })

const route = useRoute()
const id = computed(() => route.params.id as string)
const store = useCharacterStore()

const entity = computed(() => store.byId[id.value])

const { data: archetype } = await useAsyncData(
    'archetype',
    (_nuxtApp, { signal }) => $fetch(`/api/archetypes/${entity.value.data.archetype.key}`, { signal }),
)

const { data: keywords } = await useAsyncData(
    'keywords',
    (_nuxtApp, { signal }) => $fetch(`/api/keywords`, { signal }),
)


const attributes = computed(() => {
  return archetype.value?.prerequisites
      .filter((pre: { group: string; }) => pre.group === 'attributes')
      .map((pre: { value: number; threshold: never; }) => `${t(`stats.${pre.value}`, pre.value)} ${pre.threshold}`)
      .join(', ');
})
const skills = computed(() => {
  return archetype.value?.prerequisites
      .filter((pre: { group: string; }) => pre.group === 'skills')
      .map((pre: { value: number; threshold: never; }) => `${t(`stats.${pre.value}`, pre.value)} ${pre.threshold}`)
      .join(', ');
})
</script>

<template>

  <div v-if="archetype" class="mx-auto max-w-3xl">

    <div class="flex flex-row justify-between mb-2">
      <div class="flex flex-col">
        <span class="text-2xl font-bold mb-2">{{ archetype.name }}</span>
        <span>{{ archetype.hint }}</span>

      </div>
      <div>
        <NuxtImg :src="`/img/avatars/archetype/${archetype.key}.png`" class="w-30 h-30 object-cover rounded-lg" />
        <UButton variant="ghost" color="info" :to="`/forge/characters/${id}/builder/archetype/choose`">Change Archetype</UButton>
      </div>
    </div>

    <!-- header -->
    <div class="flex flex-row gap-4">
      <UFieldGroup>
        <UBadge color="info" variant="subtle">Tier</UBadge>
        <UBadge color="info">{{ archetype.tier }}</UBadge>
      </UFieldGroup>
      <UFieldGroup>
        <UBadge color="info" variant="subtle">Species</UBadge>
        <UBadge color="info">{{ archetype.species.map(i => i.name).join(' / ') }}</UBadge>
      </UFieldGroup>
      <UFieldGroup>
        <UBadge color="info" variant="subtle">XP Cost</UBadge>
        <UBadge color="info">{{ archetype.cost }}</UBadge>
      </UFieldGroup>
    </div>

    <USeparator class="mb-2"/>

    <div v-if="attributes" class="mb-2"><strong>Attributes: </strong><span>{{ attributes }}</span></div>
    <div v-if="skills" class="mb-4"><strong>Skills: </strong><span>{{ skills }}</span></div>

    <!-- Keywords -->
    <div v-if="archetype.keywords" class="mb-4">
      <strong class="mr-2">Keywords:</strong>
      <span v-for="k in archetype.keywords.filter((i) => !i.startsWith('['))" :key="k" class="text-error-800 font-semibold uppercase">{{k}}, </span>
    </div>

    <div v-if="archetype.keywords && keywords">
      <div v-for="k in archetype.keywords.filter((i) => i.startsWith('['))" :key="k">
        <ForgeKeywordDetails :keyword-name="k"/>
      </div>
    </div>

    <!-- features -->
    <template v-if="archetype.archetypeFeatures.length > 0">

      <div class="mt-4 mb-4">
        <h3 class="font-light text-sm">Archetype Abilities</h3>
        <USeparator class="mb-2" />

        <div class="flex flex-col gap-2">
          <div v-for="feature in archetype.archetypeFeatures" :key="feature.name">
            <ForgeFeatureDetails :feature="feature"></ForgeFeatureDetails>
          </div>
        </div>
      </div>
    </template>

    <!-- Wargear -->
    <div class="mt-4 mb-4">
      <h3 class="font-light text-sm">Wargear</h3>
      <USeparator class="mb-2" />
      <div class="flex flex-col gap-2">
        <div v-for="gear in archetype.wargear" :key="gear.name" class="hover:bg-black/10 p-2">
          <div v-if="gear.options">{{ gear.name }}</div>
          <ForgeWargearDetail v-else :wargear-name="gear.name" :variant="gear.variant" :amount="gear.amount"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>