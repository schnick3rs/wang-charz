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
    const title = 'Archetypes - Wrath & Glory Reference | Library';
    const description = 'Oh there are way to many archetypes written by fans. Filter a little and then pick the one you want.'
      + ' Check the linked homebrews for details.';

    const image = `/img/avatars/archetype/${this.item.key}.png`

    return {
      title,
      meta: [
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:title', name: 'og:title', content: title },
        { hid: 'og:description', name: 'og:description', content: description },
        { hid: 'og:image', name: 'og:image', content: image },
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
