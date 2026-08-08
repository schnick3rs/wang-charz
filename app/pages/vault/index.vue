<script setup lang="ts">
import type {BreadcrumbItem, TableColumn} from "@nuxt/ui";

const crumbs = ref<BreadcrumbItem[]>([
  {
    label: '',
    icon: 'i-lucide-home',
    to: '/'
  },
  {
    label: 'Vault',
    icon: 'i-game-icons-locked-chest',
    to: '/vault',
    exact: true
  },
])

const { data, pending } = await useAsyncData(
    'homebrews',
    (_nuxtApp, { signal }) => $fetch('/api/homebrews', { signal }),
)
const table = useTemplateRef('table')
const columns: TableColumn<Species>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    filterFn: (row, columnId, filterValue: string[]) => {
      if (!filterValue || filterValue.length === 0) return true
      const tags = [...(row.original.contentTags ?? []), ...(row.original.keywordTags ?? [])]
      console.info('ackack')
      return filterValue.some((value) => tags.includes(value))
    },
  },
  {
    accessorKey: 'version',
    header: 'Version',
    meta: {
      class: {
        th: 'text-center',
        td: 'text-center',
      }
    },
    cell: ({ row }) => {
      return h(UBadge, { variant: 'subtle', color: 'neutral' }, row.original.version)
    },
  },
  {
    accessorKey: 'modifiedAt',
    header: 'Modiefied at',
    meta: {
      class: {
        th: 'text-right',
        td: 'text-right',
      }
    },
  },
  {
    accessorKey: 'supplements',
    header: 'Build for',
    meta: {
      class: {
        th: 'text-center',
        td: 'text-center',
      }
    },
    cell: ({ getValue }) => {
      let color = 'primary';
      switch (getValue()) {
        case 'Core v1.0':
          color = 'error';
      }
      return h(UBadge, { variant: 'subtle', color }, getValue())
    },
  },
  {
    accessorKey: 'author',
    header: 'Author',
  },
];

const globalFilter = ref('')

const contentItems = computed(() => {
  const contentOptions = [];
  data.value.forEach((item) => {
    if (item.contentTags) contentOptions.push(...item.contentTags);
    if (item.keywordTags) contentOptions.push(...item.keywordTags);
  });
  return [...new Set(contentOptions)].sort();
})

const columnFilters = ref([
  {
    id: 'title',
    value:  []
  },
])

</script>

<template>

  <DoomBreadcrumb :items="crumbs" />

  <h1 class="text-3xl sm:text-4xl text-pretty font-bold text-highlighted border-b-4 pb-2 border-b-green-600">Hombebrew Documents</h1>

  <div class="grid grid-cols-1 gap-2 px-4 py-3.5 border-b border-accented sm:grid-cols-2 bg-gray-100 dark:bg-gray-800">
    <UInput v-model="globalFilter" placeholder="Fulltext Search..." />

    <USelectMenu
        :items="contentItems"
        :model-value="table?.tableApi?.getColumn('title')?.getFilterValue()"
        @update:model-value="table?.tableApi?.getColumn('title')?.setFilterValue($event)"
        placeholder="Filter Content Tags..."
        multiple
        clear
    />
  </div>

  <UTable
      ref="table"
      :loading="pending"
      v-model:global-filter="globalFilter"
      v-model:column-filters="columnFilters"
      :columns="columns"
      :data="data"
      :ui="{ td: 'p-2'}"
  >
    <template #title-cell="{ row }">
      <UUser
          :name="row.original.title"
          :description="row.original.hint"
      ></UUser>
    </template>
  </UTable>

  <UCard
      class="mt-8"
      title="Search the Vault for precious, fan-made homebrews"
  >
    In desperate need of an option to extend your Wrath & Glory Campaign?
    Searching for that particular homebrew to improve your setting?
    The Vault has you covered.
    This is a <strong>curated list of homebrews</strong> from fans, found in the internet.
    I credit the author and link to their community pages, as good as I could, if I find them either in the document found or on their respective page. If want to add, remove or change your homebrew content or if you want to propose changes regarding links, you can mail me to <a href="mailto:docsofdoom+vault@gmail.com">docsofdoom+vault(at)gmail.com</a>.
  </UCard>

</template>

<style scoped>

</style>