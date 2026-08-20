<script setup lang="ts">
import type {WeaponProfile} from "#shared/types/wargear.schema.ts";
import type {TableColumn} from "@nuxt/ui";
import {UIcon} from "#components";
import {useWargearIcon} from "~/composables/useWargearIcon.ts";

const props = defineProps<{
  name: string;
  profiles: WeaponProfile[],
}>()

const { getWargearTypeIcon } = useWargearIcon()

const columns: TableColumn<WeaponProfile>[] = [
  {
    accessorKey: "type",
    header: '',
    cell: ({ getValue }) => {
      if (getValue() === 'ranged-weapon')
        return h(UIcon, { class: 'size-6', name: getWargearTypeIcon('Ranged Weapon') });
      if (getValue() === 'melee-weapon')
        return h(UIcon, { class: 'size-6', name: getWargearTypeIcon('Melee Weapon') });

      return '?'
    }
  },
  {
    accessorKey: "damage.static",
    header: 'Damage',
    meta: { class: { th: 'text-center', td: 'text-center' } },
    cell: ({ row, getValue }) => {
      if (row.original.type === 'melee-weapon')
        return `${row.original.damage.ignoreStrength === true ? '' : '(S)+'}${getValue()}`

      return getValue()
    }
  },
  {
    accessorKey: "damage.ed",
    header: 'ED',
    meta: { class: { th: 'text-center', td: 'text-center' } },
  },
  {
    accessorKey: "ap",
    header: 'AP',
    meta: { class: { th: 'text-center', td: 'text-center' } },
  },
  {
    accessorKey: "range",
    header: 'Range',
    meta: { class: { th: 'text-center', td: 'text-center' } },
    cell: ({ row, getValue }) => {
      const range = (getValue() || 0) as number;

      if (row.original.type === 'ranged-weapon')
        if (row.original.thrownX) {
          return getValue()
        }
        return `${range/2} | ${range} | ${range*1.5}`

      if (row.original.type === 'melee-weapon')
        return range > 1 ? range : '-'

      return '?'
    }
  },
  {
    accessorKey: "salvo",
    header: 'Salvo',
    meta: { class: { th: 'text-center', td: 'text-center' } },
  },
  {
    accessorKey: "traits",
    header: 'Traits',
    cell: ({ getValue }) => {
      const value = getValue() as string[];
      return value.join(', ')
    }
  },
]

</script>

<template>
  <UTable
      :columns="columns" :data="profiles"
  />
</template>

<style scoped>

</style>