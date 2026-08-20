<script setup lang="ts">
import type {TableColumn} from "@nuxt/ui";
import type {ArmourProfile} from "#shared/types/wargear.schema.ts";
import {WargearIcon} from "#components";

const props = defineProps<{
  name: string;
  profiles: ArmourProfile[],
}>()

const data = ref<ArmourProfile[]>();

const columns: TableColumn<ArmourProfile>[] = [
  {
    accessorKey: "type",
    header: '',
    cell: () => {
      return h(WargearIcon, { type: 'Armour' })
    }
  },
  {
    accessorKey: "armourRating",
    header: 'Armour Rating',
    meta: { class: { th: 'text-center', td: 'text-center' } },
    cell: ({ row, getValue }) => {
      return `${getValue()}${row.original.isInvulnerable ? '*' : ''}`
    }
  },
  {
    accessorKey: "traits",
    header: 'Traits',
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