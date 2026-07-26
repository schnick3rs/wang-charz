<template>
  <div>
    <!-- Breadcrumbs -->
    <dod-default-breadcrumbs :items="breadcrumbItems" />

    <!-- Faction Details -->
    <v-row justify="center" no-gutters>
      <v-col :cols="12" :sm="10">
        <dod-faction-details :item="item" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import DodDefaultBreadcrumbs from '~/components/DodDefaultBreadcrumbs';
import DodFactionDetails from '~/components/DodFactionDetails';
import BreadcrumbSchemaMixin from '~/mixins/BreadcrumbSchemaMixin';

export default {
  name: 'Faction',
  components: {
    DodDefaultBreadcrumbs,
    DodFactionDetails,
  },
  mixins: [
    BreadcrumbSchemaMixin,
  ],
  async asyncData({ params, $axios, error }) {
    const { slug } = params;

    const response = await $axios.get(`/api/factions/${slug}`);
    const item = response.data;

    if (item === undefined || item.length <= 0) {
      error({ statusCode: 404, message: 'Faction not found' });
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
          text: 'Faction', nuxt: true, exact: true, to: '/library/factions',
        },
        {
          text: item.name, disabled: true, nuxt: true, to: `/library/factions/${slug}`,
        },
      ],
    };
  },
  head() {
    const title = `${this.item.name} - Faction`;
    const description = this.item.source.key.includes('core')
      ? `The ${this.item.name} from ${this.item.group} is an official Faction described in the ${this.item.source.book}.`
      : `The ${this.item.name} from ${this.item.group} is a homebrew Faction provided by ${this.item.source.book}.`;
    const image = this.item.thumbnail
      ? `https://www.doctors-of-doom.com${this.item.thumbnail}`
      : `https://www.doctors-of-doom.com/img/bestiary/faction_${this.item.group.toLowerCase()}_avatar.png`;

    return {
      titleTemplate: '%s | Wrath & Glory Library',
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
};
</script>

<style scoped>

</style>
