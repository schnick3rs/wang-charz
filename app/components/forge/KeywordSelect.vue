<script setup lang="ts">
const props = defineProps<{
  bracketedName: string
}>()

const { data: children } = await useAsyncData(
    `keyword-children-${props.bracketedName.toLocaleLowerCase()}`,
    (_nuxtApp, { signal }) => $fetch(`/api/keywords`, { signal, query: { parent: props.bracketedName.toLocaleLowerCase() } }),
)

const selected = ref<string>()

const selectedItem = computed(() => {
  if (selected.value && children.value) {
    console.info('selected', selected.value)
    return children.value.find((v) => v.key === selected.value)
  }
  return undefined
})
</script>

<template>
  <div v-if="children" class="border-l-4 border-l-red-600  mt-2 pl-4 mb-4">
    <USelect
        v-model="selected"
        :items="children"
        value-key="key"
        label-key="name"
        description-key="description"
        class="w-full mb-2"
        placeholder="Select Keyword ..."
        @update:model-value="(data) => console.info(`update-model`, data)"
    />
    <div v-if="selectedItem">
      <ForgeKeywordDetails :key="selectedItem.name" :keyword-name="selectedItem.name" />
    </div>
  </div>
</template>

<style scoped>

</style>