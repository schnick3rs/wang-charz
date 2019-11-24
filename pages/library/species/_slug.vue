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
