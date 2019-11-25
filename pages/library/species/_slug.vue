<template>

  <div>

    <!-- Breadcrumbs -->
    <dod-default-breadcrumbs v-bind:items="breadcrumbItems" />

    <!-- Species Details -->
    <v-row justify="center" no-gutters>

      <v-col v-bind:cols="12" v-bind:sm="10">

        <dod-species-details v-bind:item="item" ></dod-species-details>

      </v-col>

    </v-row>

  </div>

</template>

<script>
import DodDefaultBreadcrumbs from '~/components/DodDefaultBreadcrumbs';
import DodSpeciesDetails from '~/components/DodSpeciesDetails';

export default {
  name: "species",
  components: {
    DodDefaultBreadcrumbs,
    DodSpeciesDetails,
  },
  mixins: [],
  head() {
    const title = `${this.item.name} - Species`;
    const description = this.item.source.key.indexOf('core') >= 0
      ? `The ${this.item.name} from ${this.item.group} is an official Species described in the ${this.item.source.book}.`
      : `The ${this.item.name} from ${this.item.group} is a homebrew Species provided by ${this.item.source.book}.`;
    const image = this.item.thumbnail
      ? `https://www.doctors-of-doom.com${this.item.thumbnail}`
      : `https://www.doctors-of-doom.com/img/bestiary/faction_${this.item.group.toLowerCase()}_avatar.png`;

    return {
      titleTemplate: '%s | Wrath & Glory Library',
      title: title,
      meta: [
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:title', name: 'og:title', content: title },
        { hid: 'og:description', name: 'og:description', content: description },
        { hid: 'og:image', name: 'og:image', content: image },
      ],
    };
  },
  async asyncData({ params, $axios, error }) {
    const slug = params.slug;

    const response = await $axios.get(`/api/species/${slug}`);
    const item = response.data;

    if ( item === undefined || item.length <= 0 ) {
      error({ statusCode: 404, message: 'Species not found' });
    }

    return {
      item: item,
      slug: slug,
    };
  },
  computed: {
    breadcrumbItems() {
      return [
        { text: '', nuxt: true, exact: true, to: '/', },
        { text: 'Library', nuxt: true, exact: true, to: '/library', },
        { text: 'Species', nuxt: true, exact: true, to: '/library/species', },
        { text: this.item.name, disabled: true, nuxt: true, to: `/library/species/${this.slug}`, },
      ]
    },
  }
}
</script>

<style scoped>

</style>
