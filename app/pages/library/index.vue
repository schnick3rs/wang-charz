<script setup lang="ts">
import type {BreadcrumbItem} from "@nuxt/ui";

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

const sections = [
      {
        key: 'species',
        title: 'Species',
        subtitle: 'Browse Species, Abhumans and Variants',
        imageSrc: '/img/artwork_vault_bright.jpg',
        htmlText: '',
        link: { text: 'Browse Species', route: '/library/species' },
        isActive: true,
        classes: [],
      },
      {
        key: 'archetypes',
        title: 'Archetypes',
        subtitle: 'Browse Archetypes, filter by Species and Groups',
        imageSrc: '/img/artwork_vault_bright.jpg',
        htmlText: '',
        link: { text: 'Browse Archetypes', route: '/library/archetypes' },
        isActive: true,
        classes: [],
      },
      {
        key: 'ascensionPackages',
        title: 'Ascension Packages',
        subtitle: 'Browse Ascension Options and Packages',
        imageSrc: '/img/artwork_vault_bright.jpg',
        htmlText: '',
        link: { text: 'Browse Ascensions', route: '/library/ascension-packages' },
        isActive: true,
        classes: [],
      },
      {
        key: 'talents',
        title: 'Talents',
        subtitle: 'Browse Options to flesh out your Character',
        imageSrc: '/img/artwork_vault_bright.jpg',
        htmlText: '',
        link: { text: 'Browse Talents', route: '/library/talents' },
        isActive: true,
        classes: [],
      },
      {
        key: 'psychicPowers',
        title: 'Psychic Powers',
        subtitle: 'Browse Psychic Powers of various Disciplines',
        imageSrc: '/img/artwork_vault_bright.jpg',
        htmlText: '',
        link: { text: 'Browse Powers', route: '/library/psychic-powers' },
        isActive: true,
        classes: [],
      },
      {
        key: 'wargear',
        title: 'Wargear',
        subtitle: 'Browse Weapons, Armour, Equipment and more',
        imageSrc: '/img/artwork_vault_bright.jpg',
        htmlText: '',
        link: { text: 'Browse Wargear', route: '/library/wargear' },
        isActive: true,
        classes: [],
      },
      {
        key: 'factions',
        title: 'Factions',
        subtitle: 'Browse Factions',
        imageSrc: '/img/artwork_vault_bright.jpg',
        htmlText: '',
        link: { text: 'Browse Factions', route: '/library/factions' },
        isActive: true,
        classes: [],
      },
      {
        key: 'frameworks',
        title: 'Frameworks',
        subtitle: 'Browse Campaign Frameworks',
        imageSrc: '/img/artwork_vault_bright.jpg',
        htmlText: '',
        link: { text: 'Browse Frameworks', route: '/library/frameworks' },
        isActive: true,
        classes: [],
      },
    ].sort((a,b) => a.title.localeCompare(b.title));
</script>

<template>

  <DoomBreadcrumb :items="crumbs" />

  <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
    <UPageCard
        v-for="section in sections"
        :key="section.title"
        class="overflow-hidden"
        :ui="{ root: 'hover:shadow-lg/30', container: 'p-0 sm:p-0'}"
        :to="section.link.route"
    >
      <div class="flex">

        <div class="flex flex-1 flex-col p-4">
          <h2
              class="text-3xl"
              v-html="section.title"
          />

          <p class="mt-2 text-sm text-muted">
            {{ section.subtitle }}
          </p>

          <div
              class="mt-4 flex-1 text-sm leading-6 hidden sm:block"
              v-html="section.htmlText"
          />

          <UButton
              class="mt-6 hidden sm:block"
              :link="section.link.route"
              size="xl"
          >
            {{ section.link.text }}
          </UButton>
        </div>
      </div>
    </UPageCard>
  </div>
</template>

<style scoped>

</style>