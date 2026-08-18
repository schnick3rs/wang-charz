<script setup lang="ts">
import type {FeatureOptionType} from "#shared/types/archetype.ts";

const { options } = defineProps<{
  options: FeatureOptionType
}>()

const selected = ref<string>()

const selectedItem = computed(() => {
  if (selected.value && options.value) {
    console.info('feature option selected', selected.value)
    return options.value.find((v) => v.key === selected.value)
  }
  return undefined
})
</script>

<template>
  <div v-if="options" class="border-l-4 border-l-red-600  mt-2 pl-4 mb-4">
    <USelect
        v-model="selected"
        :items="options"
        value-key="key"
        label-key="name"
        description-key="snippet"
        class="w-full mb-2"
        placeholder="Select ..."
        @update:model-value="(data) => console.info(`update-model`, data)"
    />
    <div v-if="selectedItem">
      <ForgeFeatureDetails :feature="selectedItem" />
    </div>
  </div>
</template>

<style scoped>

</style>