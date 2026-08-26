<script setup lang="ts">
import {useCharacterStore} from "~~/stores/characters.ts";
import {attributeRepository, skillRepository, traitRepository} from "#shared/utils/stats.ts";

definePageMeta({ layout: 'forge' })

const route = useRoute()
const id = computed(() => route.params.id as string)
const store = useCharacterStore()

const entity = computed(() => store.byId[id.value])

//TODO load species and apply max values
function effectiveTrait(trait: any) {

  if (trait.key === 'speed') return 'X'

  let baseValue = 0

  if (trait.attribute) {
    const associatedAttribute = attributeRepository.find((a) => a.name === trait.attribute)
    baseValue = entity.value.data.attributes[associatedAttribute.key]
  }

  if (trait.skill) {
    const associatedSkill = skillRepository.find((a) => a.name === trait.skill)
    baseValue = entity.value.data.skills[associatedSkill.key]
  }

  const { static: statik, multi, tier, min } = trait.compute

  const computedValue = statik + ( baseValue * multi ) + (tier * entity.value.data.settingTier )

  return Math.ceil(Math.max(computedValue, min))
}
</script>

<template>
  <div class="mx-auto max-w-3xl">

    <h1 class="font-bold text-2xl">Select Attributes & Skills</h1>

    <div v-if="entity" class="grid grid-cols-1 md:grid-cols-2 gap-4">

      <UCard :ui="{ body: 'flex flex-col gap-2' }">

        <div v-for="attribute in attributeRepository" :key="attribute.key" class="flex items-center justify-between">
          <span>{{ $t(`stats.${attribute.key}`, attribute.name) }}</span>
          <UInputNumber
              v-model="entity.data.attributes[attribute.key]"
              :min="1"
              :increment="{
              color: 'primary',
              variant: 'subtle',
              size: 'xs'
            }"
              :decrement="{
              color: 'error',
              variant: 'subtle',
              size: 'xs'
            }"
              class="w-32"
          />
        </div>

        <USeparator></USeparator>

        <div>
          <div v-for="trait in traitRepository" :key="trait.key" class="flex items-center justify-between gap-2">
            <span>{{ $t(`stats.${trait.key}`, trait.name) }}</span>
            <span class="mx-15 my-1">{{ effectiveTrait(trait) }}</span>
          </div>
        </div>

      </UCard>

      <UCard :ui="{ body: 'flex flex-col gap-2' }">

        <div v-for="skill in skillRepository" :key="skill.key" class="flex items-center justify-between">
          <span>{{ $t(`stats.${skill.key}`, skill.name) }}</span>
          <UInputNumber
              v-model="entity.data.skills[skill.key]"
              :min="1"
              :max="6"
              :increment="{
              color: 'primary',
              variant: 'subtle',
              size: 'xs',
            }"
              :decrement="{
              color: 'error',
              variant: 'subtle',
              size: 'xs',
            }"
              class="w-32"
          />
        </div>
      </UCard>

    </div>

  </div>
</template>

<style scoped>

</style>