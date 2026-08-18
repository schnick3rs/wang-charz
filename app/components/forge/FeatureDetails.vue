<script setup lang="ts">
const { feature } = defineProps<{
  feature: ArchetypeFeature
}>()


</script>

<template>
  <div v-if="feature">

    <strong>{{ feature.name }}</strong>
    <div v-if="feature.description" v-html="feature.description"></div>
    <div v-else><p>{{ feature.snippet}}</p></div>

    <ForgeFeatureOptionsSelect :options="feature.options"></ForgeFeatureOptionsSelect>
  </div>
</template>

<style scoped>

</style>