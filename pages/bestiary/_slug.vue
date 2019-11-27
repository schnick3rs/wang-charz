<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <div>

    <!-- Breadcrumbs -->
    <dod-default-breadcrumbs v-bind:items="breadcrumbItems" />

    <!-- Threat Details -->
    <v-row justify="center" no-gutters>

      <v-col v-bind:cols="10" >

        <dod-threat-details v-bind:item="item" ></dod-threat-details>

      </v-col>

    </v-row>

  </div>

</template>

<script>
import DodDefaultBreadcrumbs from '~/components/DodDefaultBreadcrumbs';
import DodThreatDetails from '~/components/DodThreatDetails';
import SluggerMixin from '~/mixins/SluggerMixin';
import BreadcrumbSchemaMixin from '~/mixins/BreadcrumbSchemaMixin';

export default {
  components: {
    DodDefaultBreadcrumbs,
    DodThreatDetails,
  },
  mixins: [
    BreadcrumbSchemaMixin,
    SluggerMixin,
  ],
  head() {

    const title = `${this.item.name} - ${this.item.faction} Threat`;
    const description = this.item.description
      ? `${this.item.description}`
      : `The ${this.item.name} from the ${this.item.faction} faction is a threat provided by ${this.item.source.book}.`;
    const image = this.item.thumbnail
      ? `https://www.doctors-of-doom.com${this.item.thumbnail}`
      : `https://www.doctors-of-doom.com/img/bestiary/faction_${this.textToKebab(this.item.faction)}_avatar.png`;

    return {
      titleTemplate: '%s | Wrath & Glory Bestiary',
      title: title,
      meta: [
        { hid: 'description', name: 'description', content: description },

        // Open Graph
        { hid: 'og:title', name: 'og:title', content: title },
        { hid: 'og:description', name: 'og:description', content: description },
        { hid: 'og:image', name: 'og:image', content: image },

        // Twitter
        { hid: 'twitter:image', name: 'twitter:image', content: image },

        {
          hid: 'keywords',
          name: 'keywords',
          content: [
            //...this.item.keywords.filter( k => k.indexOf('<') !== 0),
            'Threat',
            'Bestiary',
            'Wrath & Glory',
          ].join(','),
        },
      ],
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        { innerHTML: JSON.stringify(this.breadcrumbJsonLdSchema(this.breadcrumbItems)), type: 'application/ld+json' },
      ]
    }
  },
  async asyncData({ params, $axios, error }) {
    const slug = params.slug;

    const response = await $axios.get(`/api/threats/${slug}`);
    const item = response.data;

    if ( item === undefined || item.length <= 0 ) {
      error({ statusCode: 404, message: 'Threat not found' });
    }

    return {
      item: item,
      slug: slug,
      breadcrumbItems: [
        { text: '', nuxt: true, exact: true, to: '/', },
        { text: 'Bestiary', nuxt: true, exact: true, to: '/bestiary', },
        { text: this.item.name, disabled: true, nuxt: true, to: `/bestiary/${this.slug}`, },
      ],
    };
  },
  computed: {
  },
}
</script>

<style scoped>

</style>
