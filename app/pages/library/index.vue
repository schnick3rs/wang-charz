<script setup lang="ts">
import type {BreadcrumbItem} from "@nuxt/ui";
import {library} from "#shared/navigation/library.ts";

const crumbs = ref<BreadcrumbItem[]>([
  {
    label: '',
    icon: 'i-lucide-home',
    to: '/'
  },
  {
    label: 'Library',
    icon: 'i-game-icons-bookshelf',
    to: '/library',
    exact: true
  },
])

</script>

<template>

  <DoomBreadcrumb :items="crumbs" />

  <div class="grid gap-2 md:gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <UPageCard
        v-for="section in library"
        :key="section.title"
        class="overflow-hidden"
        :to="section.link.route"
        :icon="section.icon"
        :title="section.title"
        :description="section.subtitle"
        :ui="{
          root: 'hover:shadow-lg/30',
          container: 'p-1, sm:p-4',
          title: 'text-2xl',
        }"
    >
      <template #footer>
        <UButton
            class="hidden sm:block "
            :link="section.link.route"
            size="xl"
        >
          {{ section.link.text }}
        </UButton>
      </template>

    </UPageCard>
  </div>
</template>

<style scoped>

</style>