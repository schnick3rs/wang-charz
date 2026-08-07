<script setup lang="ts">
import { getPaginationRowModel } from '@tanstack/vue-table'
const table = useTemplateRef('table')
const { data, status, pending, error, refresh, clear } = await useAsyncData(
    'mountains',
    (_nuxtApp, { signal }) => $fetch('/api/archetypes', { signal }),
)

const pagination = ref({
  pageIndex: 0,
  pageSize: 25
})
</script>

<template>
  <UTable
      ref="table"
      v-model:pagination="pagination"
      :data="data"
      :pagination-options="{
        getPaginationRowModel: getPaginationRowModel()
      }"
  >
    <template #name-cell="{ row }">
      <UUser
          :avatar="{ src: `/img/avatars/archetype/${row.original.key}.png`}"
          :name="row.original.name"
          :description="row.original.faction"
      ></UUser>
    </template>
  </UTable>

  <div class="flex justify-center border-t border-default pt-4 px-4">
    <UPagination
        show-edges
        :page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
        :items-per-page="table?.tableApi?.getState().pagination.pageSize"
        :total="table?.tableApi?.getFilteredRowModel().rows.length"
        @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
    />
  </div>

</template>

<style scoped>

</style>