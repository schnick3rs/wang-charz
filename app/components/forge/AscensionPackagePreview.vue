<script setup lang="ts">
const { ascensionPackage } = defineProps<{ ascensionPackage: AscensionPackage }>();

</script>

<template>

  <div v-if="ascensionPackage">

    <!-- header -->
    <div class="flex flex-row justify-between mb-2">
      <div class="flex flex-col">
        <span class="text-2xl font-bold mb-2">{{ ascensionPackage.name }}</span>
        <span class="italic text-sm font-medium">{{ ascensionPackage.source.book }}, pg. {{ ascensionPackage.source.page}}</span>
        <span>{{ ascensionPackage.hint }}</span>
      </div>
      <NuxtImg :src="`/img/avatars/ascension/${ascensionPackage.key}.png`" class="w-24 h-24 object-cover rounded-lg" />
    </div>

    <!-- cost -->
    <div class="mb-4" v-if="ascensionPackage.prerequisites.length > 0">
      <h3 class="font-light text-sm">Requirement</h3>
      <USeparator class="mb-4" />
      <ul>
        <li v-for="r in ascensionPackage.prerequisites" :key="JSON.stringify(r)">{{r}}</li>
      </ul>
    </div>

    <!-- features -->
    <template v-if="ascensionPackage.ascensionFeatures.length > 0">

      <div class="mb-4">
        <h3 class="font-light text-sm">Story Elements</h3>
        <USeparator class="mb-2" />

        <div class="flex flex-col gap-2">
          <div v-for="feature in ascensionPackage.ascensionFeatures" :key="feature.name">
            <strong>{{ feature.name }}</strong>
            <div v-if="feature.description" v-html="feature.description" />
            <div v-else><p>{{ feature.snippet}}</p></div>
          </div>
        </div>
      </div>
    </template>

  </div>

</template>

<style scoped>

</style>