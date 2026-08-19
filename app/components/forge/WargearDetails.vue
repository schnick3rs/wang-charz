<script setup lang="ts">
const props = defineProps<{
  wargearName: string
}>()

const { data: wargear } = await useAsyncData(
    `wargear-${props.wargearName}`,
    (_nuxtApp, { signal }) => $fetch(`/api/wargear`, { signal, query: { name: props.wargearName } }),
)

</script>

<template>
  <div v-if="wargear">
    <div class="font-semibold text-error-800">{{ wargear.name }}</div>
    {{wargear}}
  </div>
</template>

<style scoped>

</style>