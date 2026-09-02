<script setup lang="ts">
const { archetype } = defineProps<{ archetype: Archetype }>();

const wargearString = computed(() => {
  if (archetype.wargearString) return archetype.wargearString;

  if (archetype.wargear) {
    return archetype.wargear.map((gear) => `${gear.amount ? gear.amount + ' ' : '' }${gear.name}`).join(', ');
  }

  return 'something something error';
})

const { t } = useI18n();
const attributes = computed(() => {
  return archetype.prerequisites
      .filter((pre) => pre.group === 'attributes')
      .map((pre) => `${t(`stats.${pre.value}`, pre.value)} ${pre.threshold}`)
      .join(', ');
})
const skills = computed(() => {
  return archetype.prerequisites
      .filter((pre) => pre.group === 'skills')
      .map((pre) => `${t(`stats.${pre.value}`, pre.value)} ${pre.threshold}`)
      .join(', ');
})

</script>

<template>

  <div v-if="archetype">

    <!-- header -->
    <div class="flex flex-row justify-between mb-2">
      <div class="flex flex-col">
        <span class="text-2xl font-bold">{{ archetype.name }}</span>
        <span class="italic text-sm font-medium mb-2">{{ archetype.source.book }}, pg. {{ archetype.source.page}}</span>
        <span>{{ archetype.hint }}</span>
      </div>
      <NuxtImg :src="`/img/avatars/archetype/${archetype.key}.png`" class="w-24 h-24 object-cover rounded-lg" />
    </div>

    <!-- cost -->
    <div class="mb-4">
      <USeparator class="mb-4" />

      <div class="flex flex-row gap-4">
        <UFieldGroup>
          <UBadge color="info" variant="subtle">Faction</UBadge>
          <UBadge color="info">{{ archetype.faction }}</UBadge>
        </UFieldGroup>
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
          <UBadge color="info">{{ archetype.costs.total }}</UBadge>
        </UFieldGroup>
      </div>
    </div>

    <div class="mb-4">
      <h3 class="font-light text-sm">Requirement</h3>
      <USeparator class="mb-4" />
      <div v-if="attributes" class="mb-2"><strong>Attributes: </strong><span>{{ attributes }}</span></div>
      <div v-if="skills" class="mb-4"><strong>Skills: </strong><span>{{ skills }}</span></div>
    </div>

    <!-- keywords -->
    <template v-if="archetype.archetypeFeatures.length > 0">

      <div class="mb-4">
        <h3 class="font-light text-sm">Keywords</h3>
        <USeparator class="mb-2" />

        <div v-if="archetype.keywords" class="mb-4 flex gap-2">
          <UBadge v-for="k in archetype.keywords" :key="k" color="error" variant="outline">{{k}}</UBadge>
        </div>
      </div>
    </template>
    <!-- stats -->

    <!-- features -->
    <template v-if="archetype.archetypeFeatures.length > 0">

      <div class="mb-4">
        <h3 class="font-light text-sm">Species Abilities</h3>
        <USeparator class="mb-2" />

        <div class="flex flex-col gap-2">
          <div v-for="feature in archetype.archetypeFeatures" :key="feature.name">
            <strong>{{ feature.name }}</strong>
            <div v-if="feature.description" v-html="feature.description" />
            <div v-else><p>{{ feature.snippet}}</p></div>
          </div>
        </div>
      </div>
    </template>

    <!-- wargear -->
    <template v-if="wargearString">

      <div class="mb-4">
        <h3 class="font-light text-sm">Wargear</h3>
        <USeparator class="mb-2" />
        <div>{{ wargearString }}</div>
      </div>
    </template>

    <!-- influence -->
    <template v-if="wargearString">

      <div class="mb-4">
        <h3 class="font-light text-sm">Influence</h3>
        <USeparator class="mb-2" />
        <div>+{{ archetype.influence }} Influence</div>
      </div>
    </template>

  </div>

</template>

<style scoped>

</style>