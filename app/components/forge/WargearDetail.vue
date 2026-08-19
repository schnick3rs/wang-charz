<script setup lang="ts">
import WargearIcon from "~/components/WargearIcon.vue";

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

const iconName = computed(() => {
  if (!wargear.value) return 'misc';
  switch (wargear.value.type) {

    case 'ranged': return 'i-game-icons-abdominal-armor';

    case 'Ranged Weapon':
      return wargear.value.subtype === 'Grenade & Missile Weapon'
          ? 'i-game-icons-flash-grenade'
          : 'i-game-icons-bolter-gun';

    //case 'Melee Weapon': return 'i-game-icons-energy-sword';
    case 'Melee Weapon': return 'i-game-icons-fragmented-sword';

    case 'Armour': return 'i-game-icons-abdominal-armor';

    case 'Ammo': return 'i-game-icons-machine-gun-magazine';

    //case 'Tools & Equipment': return 'i-game-icons-backpack';
    case 'Tools & Equipment': return 'i-game-icons-monkey-wrench';

    case 'Augmetics': return 'i-game-icons-cyber-eye';

    case 'Weapon Upgrade': return 'i-game-icons-bayonet';

    default: return 'i-game-icons-backpack';
  }
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

</script>

<template>
  <div v-if="wargear" class="flex flex-row gap-4">
    <WargearIcon :type="wargear.type" :subtype="wargear.subtype" />
    <div>
      <UPopover>
        <div>
          <span v-if="props.variant">{{ props.variant }} <span class="text-sm">({{ wargear.name}})</span></span>
          <template v-else><span v-if="props.amount" class="mr-2">{{amount}}x</span>{{ wargear.name }}<span v-if="props.amount">s</span></template>
          <UBadge v-if="wargear.source.key !== 'core'" variant="subtle" color="info" class="ml-1 uppercase" size="sm">{{ wargear.source.key }}</UBadge>
        </div>
        <template #content>
          <LookupWargearInfo :wargear-key="wargear.key" />
        </template>
      </UPopover>
      <div class="text-muted">{{ subtitle }}</div>
    </div>
  </div>
</template>

<style scoped>

</style>