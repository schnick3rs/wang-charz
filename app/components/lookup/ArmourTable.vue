<script setup lang="ts">
import type {TableColumn} from "@nuxt/ui";
import type {ArmourProfile} from "#shared/types/wargear.schema.ts";
import {UIcon} from "#components";
import {useWargearIcon} from "~/composables/useWargearIcon.ts";

const props = defineProps<{
  name: string;
  profiles: ArmourProfile[],
}>()

const data = ref<ArmourProfile[]>();

const { getWargearTypeIcon } = useWargearIcon()

const columns: TableColumn<ArmourProfile>[] = [
  {
    accessorKey: "type",
    header: '',
    cell: () => {
      return h(UIcon, { class: 'size-6', name: getWargearTypeIcon('Armour') });
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