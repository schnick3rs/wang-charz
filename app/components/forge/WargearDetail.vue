<script setup lang="ts">

import {useWargearIcon} from "~/composables/useWargearIcon.ts";

const props = defineProps<{
  wargearName: string
  variant?: string
  amount?: number
}>()

const { data: wargear } = await useAsyncData(
    `wargear-${props.wargearName}`,
    (_nuxtApp, { signal }) => $fetch(`/api/wargear/by-name`, { signal, query: { name: props.wargearName } } ),
    {
      transform: (data) => {
        return data[0]
      }
    }
)

const subtitle = computed(() => {
  if (wargear.value) {
    const tags = [wargear.value.type];
    if (wargear.value.subtype) {
      tags.push(wargear.value.subtype);
    }
    return tags.filter((t) => t !== undefined).join(' • ');
  }
  return '';
})

const { getWargearTypeIcon } = useWargearIcon()
</script>

<template>
  <div v-if="wargear" class="flex flex-row gap-4">
    <UIcon :name="getWargearTypeIcon(wargear.type, wargear.subtype)" />
    <div>
      <UPopover>
        <div>
          <span v-if="props.variant">{{ props.variant }} <span class="text-sm">({{ wargear.name}})</span></span>
          <template v-else><span v-if="props.amount" class="mr-2">{{amount}}x</span>{{ wargear.name }}<span v-if="props.amount">s</span></template>
          <UBadge v-if="wargear.source && wargear.source.key !== 'core'" variant="subtle" color="info" class="ml-1 uppercase" size="sm">{{ wargear.source.key }}</UBadge>
        </div>
        <template #content>
          <LookupWargearInfo :wargear-key="wargear.key" />
        </template>
      </UPopover>
      <div class="text-muted">{{ subtitle }}</div>
    </div>
  </div>
  <div v-else class="flex flex-row gap-4">
    <WargearIcon :type="misc" />
    <div>
      <div>{{wargearName}}</div>
      <div class="text-muted">Misc</div>
    </div>
  </div>
</template>

<style scoped>

</style>