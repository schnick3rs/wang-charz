<template>
  <div>
    <!-- Breadcrumbs -->
    <dod-default-breadcrumbs :items="breadcrumbItems" />

    <!-- Species Details -->
    <v-row justify="center" no-gutters>
      <v-col :cols="12">
        <ColorfulEntry :headline="item.name" flavour="forge">
          <archetype-preview :item="item" />
        </ColorfulEntry>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ColorfulEntry from '~/components/shared/ColorfulEntry';
import DodDefaultBreadcrumbs from '~/components/DodDefaultBreadcrumbs';
import ArchetypePreview from '~/components/forge/ArchetypePreviewV3';
import BreadcrumbSchemaMixin from '~/mixins/BreadcrumbSchemaMixin';

export default {
  name: 'Archetype',
  components: {
    ArchetypePreview,
    ColorfulEntry,
    DodDefaultBreadcrumbs,
  },
  mixins: [
    BreadcrumbSchemaMixin,
  ],
  head() {
    const title = `${this.item.name} - Archetypes`;
    let isOfficial = ['core','fspg','red1','cos'].includes(this.item.source.key);
    const description = isOfficial
        ? `The ${this.item.name} from the ${this.item.faction} Faction is an official archetype described in the ${this.item.source.book}.`
        : `The ${this.item.name} from the ${this.item.faction} Faction is a homebrew archetype provided by ${this.item.source.book}.`;
    const image = `/img/avatars/archetype/${this.item.key}.png`;

    const robots = {
      hid: 'robots',
      name: 'robots',
      content: isOfficial ? 'noindex,follow' : 'index,follow',
    };

    return {
      titleTemplate: '%s | Wrath & Glory Library',
      title,
      meta: [
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:title', name: 'og:title', content: title },
        { hid: 'og:description', name: 'og:description', content: description },
        { hid: 'og:image', name: 'og:image', content: image },
        robots
      ],
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        { innerHTML: JSON.stringify(this.breadcrumbJsonLdSchema(this.breadcrumbItems)), type: 'application/ld+json' },
      ],
    };
  },
  async asyncData({ params, $axios, error }) {
    const { slug } = params;

    const response = await $axios.get(`/api/archetypes/${slug}`);
    const item = response.data;

    if (item === undefined || item.length <= 0) {
      error({ statusCode: 404, message: 'Archetype not found' });
    }

    return {
      item,
      slug,
      breadcrumbItems: [
        {
          text: '', nuxt: true, exact: true, to: '/',
        },
        {
          text: 'Library', nuxt: true, exact: true, to: '/library',
        },
        {
          text: 'Archetypes', nuxt: true, exact: true, to: '/library/archetypes',
        },
        {
          text: item.name, disabled: true, nuxt: true, to: `/library/archetypes/${slug}`,
        },
      ],
    };
  },
};
</script>

<style scoped>

</style>
