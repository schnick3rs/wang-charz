<script setup lang="ts">
import {useCharacterStore} from "~~/stores/characters.ts";
import {
  attributeRepository,
  skillRepository,
  type Trait,
  traitRepository,
} from "#shared/utils/stats.ts";
import type {Prerequisite } from "#shared/types/archetype.ts";

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
const { data: archetype } = await useAsyncData(
    `archetype-${entity.value.data.archetype.key}`,
    (_nuxtApp, { signal }) => $fetch(`/api/archetypes/${entity.value.data.archetype.key}`, { signal }),
)

function effectiveTrait(trait: Trait) {
  if (!entity.value) return '?'
  if (!species.value) return '?'

  if (trait.key === 'speed') return species.value.speed

  let baseValue = 0

  if (trait.attribute) {
    const associatedAttribute = attributeRepository.find((a) => a.name === trait.attribute)
    if (associatedAttribute) {
      baseValue = entity.value.data.attributes[associatedAttribute.key]
    }
  }

  if (trait.skill) {
    const associatedSkill = skillRepository.find((a) => a.name === trait.skill)
    if (associatedSkill) {
      baseValue = entity.value.data.skills[associatedSkill.key]
    }
  }

  const { static: statik, multi, tier, min } = trait.compute

  const computedValue = statik + ( baseValue * multi ) + (tier * entity.value.data.settingTier )

  return Math.ceil(Math.max(computedValue, min))
}

function maxAttributeValue(attribute: { name: string }) {
  if (!species.value) return 8

  const attributeMax = species.value.attributeMaximums.find((max) => max.name === attribute.name)
  if (attributeMax) {
    return attributeMax.value
  }

  return 8 //the default fallback value
}

function skillDicePool(skill: { key: string }) {
  if (!entity.value) return '?'

  const skillValue = entity.value.data.skills[skill.key] || 0

  let characterAttributeValue = 0

  const associatedAttribute = attributeRepository.find((a) => a.name === skill.attribute)
  if (associatedAttribute) {
    characterAttributeValue = entity.value.data.attributes[associatedAttribute.key]
  }

  return skillValue + characterAttributeValue
}

const arePrerequisitesFullfilled = computed(() => {

  function isFulfilled(prerequisite: Prerequisite) {
    const { group, value, threshold } = prerequisite
    return entity.value.data[group][value] >= threshold
  }

  if (archetype.value) {
    return archetype.value.prerequisites.every((prerequisite: Prerequisite) => isFulfilled(prerequisite))
  }

  return true
})

const toast = useToast()
const { t } = useI18n()

function applyRequirements() {
  console.info('Apply requirements')
  if (!entity.value) return

  const log: string[] = []

  function apply(prerequisite: Prerequisite) {
    const { group, value, threshold } = prerequisite
    switch (group) {
      case 'attributes':
      case 'skills':
        if (entity.value.data[group][value] < threshold) {
          entity.value.data[group][value] = threshold
          log.push(`Increased ${t(`stats.${value}`)} to ${threshold}`)
        }
        break;

      default:
        console.warn('Unknown prerequisite group', group)
    }
  }

  if (archetype.value) {
    archetype.value.prerequisites.forEach((prerequisite: Prerequisite) => apply(prerequisite))
  }

  if (species.value) {
    species.value.prerequisites.forEach((prerequisite: Prerequisite) => apply(prerequisite))
  }

  if (log.length > 0) {
    toast.add({ title: 'Set Attributes & Skills requirements', description: h('ul', {}, log.map(item => h('li', {}, item))) })
  }
}

function resetStats() {
  Object.keys(entity.value.data.attributes).forEach((key, index) => { entity.value.data.attributes[key] = 1; });
  Object.keys(entity.value.data.skills).forEach((key, index) => { entity.value.data.skills[key] = 0; });
}

</script>

<template>
  <div class="mx-auto max-w-3xl">

    <h1 class="font-bold text-2xl mb-2 flex flex-row justify-between">
      Attributes & Skills
      <span class="shrink-0">
            <UButton
                color="info"
                title="Reset all stats to 1 and 0"
                variant="subtle"
                class="cursor-pointer"
                icon="i-game-icons-return-arrow"
                label="Reset Stats"
                :ui="{ label: 'hidden md:block'}"
                @click="resetStats()"
            />
            <UButton
                :color="arePrerequisitesFullfilled ? 'neutral' : 'info'"
                label="Ensure Requirements"
                title="Increase all Stats so that Archetype and Species requirements are met"
                variant="subtle"
                class="cursor-pointer ml-2"
                icon="i-game-icons-up-card"
                :disabled="arePrerequisitesFullfilled"
                :ui="{ label: 'hidden md:block'}"
                @click="applyRequirements()"
            />
      </span>
    </h1>



    <div v-if="entity" class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

      <UCard :ui="{ body: 'flex flex-col gap-2' }">

        <div v-for="attribute in attributeRepository" :key="attribute.key" class="flex items-center justify-between">
          <span :title="attribute.description">{{ $t(`stats.${attribute.key}`, attribute.name) }}</span>
          <div>
            <UInputNumber
                v-model="entity.data.attributes[attribute.key]"
                :min="1"
                :max="maxAttributeValue(attribute)"
                :decrement="{ color: entity.data.attributes[attribute.key] <= 1 ? 'neutral' : 'error', variant: 'subtle', size: 'xs' }"
                :increment="{ color: entity.data.attributes[attribute.key] >= maxAttributeValue(attribute) ? 'neutral' : 'primary', variant: 'subtle', size: 'xs' }"
                class="w-28"
            />
            <UBadge variant="subtle" color="neutral" class="ml-4 flex-none w-8 justify-end">
              {{ entity.data.attributes[attribute.key] }}
            </UBadge>
          </div>
        </div>

        <USeparator/>

        <div v-for="trait in traitRepository" :key="trait.key" class="flex items-center justify-between">
          <span>{{ $t(`stats.${trait.key}`, trait.name) }}</span>
          <UBadge variant="subtle" color="neutral" class="flex-none w-8 justify-end">{{ effectiveTrait(trait) }}</UBadge>
        </div>

      </UCard>

      <UCard :ui="{ body: 'flex flex-col gap-2' }">

        <div v-for="skill in skillRepository" :key="skill.key" class="flex items-center justify-between">
          <span>{{ $t(`stats.${skill.key}`, skill.name) }}</span>
          <div>
            <UInputNumber
                v-model="entity.data.skills[skill.key]"
                :min="0"
                :max="8"
                :decrement="{ color: entity.data.skills[skill.key] <= 0 ? 'neutral' : 'error', variant: 'subtle', size: 'xs' }"
                :increment="{ color: entity.data.skills[skill.key] >= 8 ? 'neutral' : 'primary', variant: 'subtle', size: 'xs' }"
                class="w-24"

            />
            <UBadge variant="subtle" color="neutral" class="ml-4 flex-none w-12 justify-end" trailing-icon="i-heroicons-cube">
              {{ skillDicePool(skill) }}
            </UBadge>
          </div>
        </div>
      </UCard>

    </div>

  </div>
</template>
