<script setup lang="ts">
import { getPaginationRowModel } from '@tanstack/vue-table'
import type {BreadcrumbItem, TableColumn} from '@nuxt/ui'
import {UButton} from "#components";

const crumbs = ref<BreadcrumbItem[]>([
  {
    label: '',
    icon: 'i-lucide-home',
    to: '/'
  },
  {
    label: 'Library',
    icon: 'i-game-icons-bookshelf',
    to: '/library'
  },
  {
    label: 'Archetypes',
    icon: 'i-game-icons-duality-mask',
    to: '/library/archetypes',
  }
])

const { data, pending } = await useAsyncData(
    'archetypes',
    (_nuxtApp, { signal }) => $fetch('/api/archetypes', { signal }),
)

const table = useTemplateRef('table')

const columns: TableColumn<Archetype>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()

      return h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label: 'Name',
        icon: isSorted
            ? isSorted === 'asc'
                ? 'i-lucide-arrow-up-narrow-wide'
                : 'i-lucide-arrow-down-wide-narrow'
            : 'i-lucide-arrow-up-down',
        class: '-mx-2.5',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
      })
    },
    filterFn: (row, columnId, filterValue: string[]) => {
      if (!filterValue || filterValue.length === 0) return true
      const speciesNames = row.original.species.map((i) => i.name)
      return speciesNames.some((name) => filterValue.includes(name))
    },
  },
  {
    accessorKey: 'faction',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()

      return h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label: 'Faction',
        icon: isSorted
            ? isSorted === 'asc'
                ? 'i-lucide-arrow-up-narrow-wide'
                : 'i-lucide-arrow-down-wide-narrow'
            : 'i-lucide-arrow-up-down',
        class: '-mx-2.5',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
      })
    },
    filterFn: (row, columnId, filterValue: string[]) => {
      if (!filterValue || filterValue.length === 0) return true
      return filterValue.includes(row.getValue(columnId))
    },
    sortingFn: (rowA, rowB) => {
      if (rowA.original.faction && rowB.original.faction) {
        return rowA.original.faction.localeCompare(rowB.original.faction);
      }
      return 0;
    }
  },
  {
    accessorKey: 'tier',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()

      return h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label: 'Tier',
        icon: isSorted
            ? isSorted === 'asc'
                ? 'i-lucide-arrow-up-narrow-wide'
                : 'i-lucide-arrow-down-wide-narrow'
            : 'i-lucide-arrow-up-down',
        class: '-mx-2.5',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
      })
    },
    meta: {
      class: {
        th: 'text-right',
        td: 'text-right',
      },
    },
  },
  {
    accessorKey: 'cost',
    header: 'Cost',
    meta: {
      class: {
        th: 'text-right',
        td: 'text-right',
      },
    },
  },
  {
    accessorKey: 'source',
    header: 'Source',
    filterFn: (row, columnId, filterValue: string[]) => {
      if (!filterValue || filterValue.length === 0) return true
      const source = row.getValue(columnId) as LegacySource;
      return filterValue.includes(source.key)
    },
  },
];

const columnFilters = ref([
  {
    id: 'faction',
    value:  []
  },
  {
    id: 'source',
    value:  []
  },
  {
    id: 'species',
    value:  []
  },
  {
    id: 'tier',
    value:  [0,5]
  },
])

const speciesItems = computed(() => {
  if (!data.value) return []
  const array = [];
  data.value.forEach((item) => {
    const speciesNames = item.species.map((s)=>s.name);
    array.push(...speciesNames);
  });
  const distinct = [...new Set(array)];
  return distinct.filter((d) => d !== null && d !== undefined).sort();
})

const factionItems = computed(() => {
  if (!data.value) return []
  const reduce = data.value.map((item) => item.faction);
  const distinct = [...new Set(reduce)];
  return distinct.filter((d) => d !== null && d !== undefined).sort();
})

const sourceItems = computed(() => {
  if (!data.value) return []
  const options = data.value.map((item) => (
      {
        value: item.source.key,
        text: `${item.source.book}`,
      }
  ));
  const distinct = [...new Map(options.map((o) => [o.value, o])).values()];
  return distinct.sort((a, b) => a.text.localeCompare(b.text));
})

const globalFilter = ref('')

const pagination = ref({
  pageIndex: 0,
  pageSize: 25
})
</script>

<template>

  <DoomBreadcrumb :items="crumbs" />

  <h1 class="text-3xl sm:text-4xl text-pretty font-bold text-highlighted border-b-4 pb-2 border-b-orange-600">Archetypes</h1>

  <div class="grid grid-cols-1 gap-2 px-4 py-3.5 border-b border-accented sm:grid-cols-2 lg:grid-cols-4 bg-gray-100">

    <UInput v-model="globalFilter" placeholder="Fulltext Search..." />

    <USelectMenu
        :items="speciesItems"
        :model-value="table?.tableApi?.getColumn('name')?.getFilterValue()"
        @update:model-value="table?.tableApi?.getColumn('name')?.setFilterValue($event)"
        placeholder="Filter Species..."
        multiple
        clear
    />
    <USelectMenu
        :items="factionItems"
        :model-value="table?.tableApi?.getColumn('faction')?.getFilterValue()"
        @update:model-value="table?.tableApi?.getColumn('faction')?.setFilterValue($event)"
        placeholder="Filter Factions..."
        multiple
        clear
    />
    <USelectMenu
        :items="sourceItems"
        label-key="text"
        value-key="value"
        :model-value="table?.tableApi?.getColumn('source')?.getFilterValue()"
        @update:model-value="table?.tableApi?.getColumn('source')?.setFilterValue($event)"
        placeholder="Filter Books..."
        multiple
        clear
    />
    <UFormField label="Filter Tier range...">
      <USlider
          :model-value="table?.tableApi?.getColumn('tier')?.getFilterValue()"
          @update:model-value="table?.tableApi?.getColumn('tier')?.setFilterValue($event)"
          :min="1"
          :max="5"
          tooltip
      />
    </UFormField>
  </div>

  <UTable
      ref="table"
      :loading="pending"
      v-model:global-filter="globalFilter"
      v-model:column-filters="columnFilters"
      v-model:pagination="pagination"
      :columns="columns"
      :data="data"
      :pagination-options="{
        getPaginationRowModel: getPaginationRowModel()
      }"
      :ui="{ td: 'p-2'}"
  >

    <template #name-cell="{ row }">
      <UUser
          :avatar="{ src: `/img/avatars/archetype/${row.original.key}.png`}"
          :name="row.original.name"
          :description="row.original.species.map((s) => s.name).join(' / ')"
      ></UUser>
    </template>

    <template #faction-cell="{ row }">
      <UUser
          :name="row.original.faction"
      ></UUser>
    </template>

    <template #source-cell="{ row }">
      <div>
        <a class="font-medium text-highlighted text-sm" :href="row.original.source.link" target="_blank">{{ row.original.source.book }}</a>
        <div class="text-muted text-xs italic" v-if="row.original.source.page">pg. {{ row.original.source.page}}</div>
      </div>
    </template>

  </UTable>

  <div class="flex justify-center border-t border-default pt-4 px-4">
    <UPagination
        show-edges
        :sibling-count="5"
        :page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
        :items-per-page="table?.tableApi?.getState().pagination.pageSize"
        :total="table?.tableApi?.getFilteredRowModel().rows.length"
        @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
    />
  </div>

</template>

<style scoped>

</style>