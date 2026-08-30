<script setup lang="ts">
const { species } = defineProps<{ species: Species }>();

const attributes = computed(() => {
  return species.prerequisites.filter(pre => pre.group === 'attributes').map(pre => `${pre.value} ${pre.threshold}`).join(', ');
})
const skills = computed(() => {
  return species.prerequisites.filter(pre => pre.group === 'skills').map(pre => `${pre.value} ${pre.threshold}`).join(', ');
})

</script>

<template>

  <div v-if="species">

    <!-- header -->
    <div class="flex flex-row justify-between mb-2">
      <div class="flex flex-col">
        <span class="text-2xl font-bold mb-2">{{ species.name }}</span>
        <span class="italic text-sm font-medium">{{ species.source.book }}, pg. {{ species.source.page}}</span>
        <span>{{ species.hint }}</span>
      </div>
      <NuxtImg :src="`/img/avatars/species/${species.key}.png`" class="w-24 h-24 object-cover rounded-lg" />
    </div>

    <!-- cost -->
    <div class="mb-4">
      <USeparator class="mb-4" />
      <strong>XP Cost:</strong> {{ species.cost }}, incl. Stats ({{ species.costs?.stats || '?' }} XP)
    </div>

    <!-- stats -->
    <div class="mb-4">
      <USeparator class="mb-4" />
      <div v-if="attributes" class="mb-1"><strong>Attributes: </strong><span>{{ attributes }}</span></div>
      <div v-if="skills" class="mb-1"><strong>Skills: </strong><span>{{ skills }}</span></div>
      <div><strong>Speed: </strong><span>{{ species.speed }}</span></div>
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
          </div>
        </div>
      </div>
    </template>

    <!-- stat max -->
    <div>
      <h3 class="font-light text-sm">Attribute Ratings Maximums</h3>
      <USeparator class="mb-2" />

      <div class="flex flex-row justify-around md:justify-between gap-4 md:gap-2 text-xs text-center overflow-x-auto flex-wrap">
        <div v-for="n in [...species.attributeMaximums, ...species.traitMaximums]" :key="n.name" >
          <strong>{{n.name}}</strong>
          <div class="text-lg">{{n.value}}</div>
        </div>
      </div>
    </div>

  </div>

</template>

<style scoped>

</style>