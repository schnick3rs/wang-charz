<script setup lang="ts">
const { type, subtype = undefined } = defineProps<{
  type: string
  subtype?: string
}>()

const iconName = computed(() => {
  switch (type) {

    case 'ranged': return 'i-game-icons-abdominal-armor';

    case 'Ranged Weapon':
      return subtype === 'Grenade & Missile Weapon'
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
</script>

<template>
  <UIcon :name="iconName" class="size-12" />
</template>

<style scoped>

</style>