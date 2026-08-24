<script setup lang="ts">
const { feature } = defineProps<{
  feature: GenericFeature
}>()

</script>

<template>
  <div v-if="feature">

    <strong>{{ feature.name }}</strong>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-if="feature.description" v-html="feature.description"/>
    <div v-else><p>{{ feature.snippet}}</p></div>

    <ForgeFeatureOptionsSelect v-if="feature.options && feature.options.length > 0" :options="feature.options"/>
  </div>
</template>

<style scoped>

</style>