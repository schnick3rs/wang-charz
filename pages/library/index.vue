<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <dod-default-breadcrumbs :items="breadcrumbItems" />

    <v-row justify="center">

      <v-col
        v-for="section in sortedSections"
        :key="section.key"
        :cols="12"
        :sm="6"
        :md="4"
        :lg="4"
      >
        <v-card
          :to="section.link.route"
          :disabled="!section.isActive"
          class="card"
          exact
          nuxt
          hover
        >
          <div class="card__image-container">
            <div class="card__image" :style="{ backgroundImage: 'url('+section.imageSrc+')' }" loading />
          </div>

          <div class="card__content-container pa-4">
            <h2 class="headline" v-html="section.title" />

            <h3 class="card__content-subtitle pb-4 subtitle-2">
              {{ section.subtitle }}
            </h3>

            <p class="body-2" v-html="section.htmlText" />

            <div class="card__content-footer">
              <v-btn block color="success">
                {{ section.link.text }}
              </v-btn>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import DodDefaultBreadcrumbs from '~/components/DodDefaultBreadcrumbs';

export default {
  components: { DodDefaultBreadcrumbs },
  head() {
    const breadcrumbListSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: this.breadcrumbItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: (index === 0 ? 'Doctors of Doom' : item.text),
        item: `https://www.doctors-of-doom.com${item.to}`,
      })),
    };

    return {
      title: 'Rules Reference Overview - Wrath & Glory Reference | Library',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'The Doctors of Doom Library contains holds vast information about the wargear '
            + 'used by friends and foes. Enter the library and search for weapons, armour and tools.',
        },
      ],
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        { innerHTML: JSON.stringify(breadcrumbListSchema), type: 'application/ld+json' },
      ],
    };
  },
  data() {
    return {
      breadcrumbItems: [
        {
          text: '', disabled: false, nuxt: true, exact: true, to: '/',
        },
        {
          text: 'Library', disabled: false, nuxt: true, exact: true, to: '/library',
        },
      ],
      sections: [
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
      ],
    };
  },
  computed: {
    sortedSections() {
      return this.sections.sort((a, b) => a.title.localeCompare(b.title));
    },
  },
  methods: {
  },
};
</script>

<style scoped lang="css">
</style>
