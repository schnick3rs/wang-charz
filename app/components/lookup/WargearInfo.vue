<script setup lang="ts">
import WeaponTable from "~/components/lookup/WeaponTable.vue";
import ArmourTable from "~/components/lookup/ArmourTable.vue";
import {useWargearIcon} from "~/composables/useWargearIcon.ts";

const props = defineProps<{
  wargearKey: string
}>()

const { data: wargear, pending } = await useAsyncData(
    `wargear-${props.wargearKey}`,
    (_nuxtApp, { signal }) => $fetch(`/api/wargear/${props.wargearKey}`, { signal }  ),
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
const value = ref(null)

const { getWargearTypeIcon } = useWargearIcon()
</script>

<template>
  <UCard>
    <div v-if="pending">
      <UProgress v-model="value"/>
    </div>
    <div v-else-if="wargear">
      <!-- header -->
      <div class="flex flex-row justify-between mb-2">
        <div class="flex flex-col">
          <span class="text-2xl font-bold mb-2">{{ wargear.name }}</span>
          <span class="italic text-sm font-medium">{{ wargear.source.book }}, pg. {{ wargear.source.page}}</span>
          <span class="text-muted">{{ subtitle }}</span>
        </div>
        <UIcon :name="getWargearTypeIcon(wargear.type, wargear.subtype)" class="size-12" />
      </div>

      <p class="w-full">
        {{ wargear.snippet }}
      </p>

      <!-- -->
      <template v-if="wargear.meta && wargear.meta.length > 0">
        <WeaponTable
            :key="wargear.key"
            v-if=" wargear.meta.filter((i) => ['ranged-weapon', 'melee-weapon'].includes(i.type)).length > 0"
            :name="wargear.name"
            :profiles="wargear.meta.filter((i) => ['ranged-weapon', 'melee-weapon'].includes(i.type))"
        />
        <ArmourTable
            :key="wargear.key"
            v-if=" wargear.meta.filter((i) => i.type === 'armour').length > 0"
            :name="wargear.name"
            :profiles="wargear.meta.filter((i) => i.type === 'armour')"
        />
      </template>
    </div>
  </UCard>
</template>

<style scoped>

</style>