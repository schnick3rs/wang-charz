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
    label: 'Wargear',
    icon: 'i-game-icons-battle-gear',
    to: '/library/wargear',
  }
])

const { data, pending } = await useAsyncData(
    'wargear',
    (_nuxtApp, { signal }) => $fetch('/api/wargear', { signal }),
)

const table = useTemplateRef('table')

const columns: TableColumn<Wargear>[] = [
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
  },
  {
    accessorKey: 'type',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()

      return h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label: 'Type',
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
  },
  {
    accessorKey: 'value',
    header: 'Value',
    meta: {
      class: {
        th: 'text-center',
        td: 'text-center',
      },
    },
  },
  {
    accessorKey: 'rarity',
    header: 'Rarity',
    cell: ({ getValue }) => {
      return h(UBadge, { variant: 'subtle' }, getValue())
    }
  },
  {
    accessorKey: 'keywords',
    header: 'Keywords',
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
    id: 'source',
    value:  []
  },
])


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

  <h1 class="text-3xl sm:text-4xl text-pretty font-bold text-highlighted border-b-4 pb-2 border-b-orange-600">
    Wargear
  </h1>

  <div class="grid grid-cols-1 gap-2 px-4 py-3.5 border-b border-accented sm:grid-cols-2 lg:grid-cols-4 bg-gray-100">

    <UInput v-model="globalFilter" placeholder="Fulltext Search..." />

    <USelectMenu
        label-key="text"
        value-key="value"
        placeholder="Filter Type..."
        multiple
        clear
    />

    <USelectMenu
        label-key="text"
        value-key="value"
        placeholder="Filter Keywords..."
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
          :avatar="{ icon: 'i-game-icons-bolter-gun'}"
          :name="row.original.name"
          :description="row.original.type"
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