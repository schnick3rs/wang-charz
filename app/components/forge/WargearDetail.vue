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

const name = computed(() => {
  if (wargear.value) {
    return wargear.value.name
  }
  return '?'
})

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
    <UPopover>
      <UUser
          :avatar="{ icon: getWargearTypeIcon(wargear.type, wargear.subtype) }"
          :description="subtitle"
      >
        <template #name>
          <span v-if="props.amount" class="mr-2">{{amount}}x</span>
          <span v-if="props.variant">{{ props.variant }} [{{ wargear.name }}]</span>
          <span v-else>{{wargear.name}}</span>
          <UBadge v-if="wargear.source && wargear.source.key !== 'core'" variant="subtle" color="info" class="ml-1 uppercase" size="sm">{{ wargear.source.key }}</UBadge>
        </template>
      </UUser>

      <template #content>
        <LookupWargearInfo :wargear-key="wargear.key" />
      </template>
    </UPopover>
  </div>
  <div v-else class="flex flex-row gap-4">
    <UUser
        :avatar="{ icon: getWargearTypeIcon('Misc') }"
        :name="wargearName"
        description="Misc"
    />
  </div>
</template>

<style scoped>

</style>