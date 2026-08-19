<script setup lang="ts">
const { archetype } = defineProps<{ archetype: Archetype }>();

const wargearString = computed(() => {
  if (archetype.wargearString) return archetype.wargearString;

  if (archetype.wargear) {
    return archetype.wargear.map((gear) => `${gear.amount ? gear.amount + ' ' : '' }${gear.name}`).join(', ');
  }

  return 'something something error';
})

</script>

<template>

  <div v-if="archetype">

    <!-- header -->
    <div class="flex flex-row justify-between mb-2">
      <div class="flex flex-col">
        <span class="text-2xl font-bold mb-2">{{ archetype.name }}</span>
        <span class="italic text-sm font-medium">{{ archetype.source.book }}, pg. {{ archetype.source.page}}</span>
        <span>{{ archetype.hint }}</span>
      </div>
      <NuxtImg :src="`/img/avatars/archetype/${archetype.key}.png`" class="w-24 h-24 object-contain rounded-lg" />
    </div>

    <!-- cost -->
    <div class="mb-4">
      <USeparator class="mb-4" />
      <strong>XP Cost:</strong> {{ archetype.cost }}, incl. Stats ({{ archetype.costs?.stats || '?' }} XP)
    </div>


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

  </div>

</template>

<style scoped>

</style>