<script setup lang="ts">
const props = defineProps<{
  keywordName: string
}>()

const { data: keyword } = await useAsyncData(
    `keyword-${props.keywordName.toLocaleLowerCase()}`,
    (_nuxtApp, { signal }) => $fetch(`/api/keywords/${props.keywordName.toLocaleLowerCase()}`, { signal }),
)



</script>

<template>
  <div v-if="keyword">
    <div class="font-semibold text-error-800">{{keyword.name}}</div>
    <div>{{keyword.description}}</div>
    <div v-if="keyword.type === 'Bracketed'">
      <ForgeKeywordSelect :bracketed-name="keyword.name"></ForgeKeywordSelect>
    </div>
  </div>
</template>

<style scoped>

</style>