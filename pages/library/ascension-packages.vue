<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <div>

    <!-- Breadcrumbs -->
    <dod-default-breadcrumbs v-bind:items="breadcrumbItems" />

    <v-row justify="center">

      <!-- filter -->
      <v-col v-bind:cols="12">

        <v-card>

          <v-card-text>

            <v-row justify="center" row wrap>

              <v-col v-bind:cols="12" v-bind:sm="6" >

                <v-text-field
                  v-model="searchQuery"
                  filled
                  dense
                  clearable
                  label="Search"></v-text-field>
              </v-col>

              <!-- filter species -->
              <v-col v-bind:cols="12" v-bind:sm="6">

                <v-select
                  v-model="filters.source.model"
                  v-bind:items="filterSourceOptions"
                  v-bind:label="filters.source.label"
                  chips
                  filled
                  clearable
                  multiple
                  deletable-chips
                  dense
                >
                </v-select>
              </v-col>


            </v-row>

          </v-card-text>

        </v-card>

      </v-col>

      <!-- Table -->
      <v-col v-bind:cols="12">

        <v-card>

          <v-data-table
            v-bind:headers="headers"
            v-bind:items="searchResult"
            v-bind:page.sync="pagination.page"
            v-bind:search="searchQuery"
            v-bind:items-per-page="15"
            v-on:page-count="pagination.pageCount = $event"
            item-key="key"
            sort-by="name"
            hide-default-footer
          >

            <template v-slot:item.source.book="{ item }">
              <v-row no-gutters>
                <v-col v-bind:cols="12">
                  {{item.source.book}}
                  <NuxtLink v-if="item.source.path" v-bind:to="item.source.path" target="_blank"><v-icon small>launch</v-icon></NuxtLink>
                </v-col>
                <v-col v-bind:cols="12" class="caption grey--text" v-if="item.source.page">
                  pg. {{ item.source.page }}
                </v-col>
              </v-row>

            </template>

            <template v-slot:expanded-item="{ headers, item }">
              <td v-bind:colspan="headers.length">
                <archetype-preview
                  v-bind:item="item"
                  class="pa-2 pt-4 pb-4"
                ></archetype-preview>
              </td>
            </template>

          </v-data-table>

          <div class="text-xs-center pt-2">
            <v-pagination
              v-model="pagination.page"
              v-bind:length="pagination.pageCount"
            />
          </div>

        </v-card>

      </v-col>

    </v-row>

  </div>

</template>

<script>
import DodDefaultBreadcrumbs from '~/components/DodDefaultBreadcrumbs';

export default {
  components: {
    DodDefaultBreadcrumbs,
  },
  mixins: [],
  head() {
    const title = 'Ascension Packages - Wrath & Glory Reference | Library';
    const description =
      'Tired of staying the course and wizzarding around? Search the Library for Ascension Packages. ' +
      'Check out the respective linked Homebrews for detailed informations.';
    const image = 'https://www.doctors-of-doom.com/img/artwork_library.jpg';

    return {
      title: title,
      meta: [
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:title', name: 'og:title', content: title },
        { hid: 'og:description', name: 'og:description', content: description },
        { hid: 'og:image', name: 'og:image', content: image },
      ],
    };
  },
  async asyncData({ $axios, query, params, error }) {

    const response = await $axios.get(`/api/ascension-packages/`);
    const items = response.data;

    if ( items === undefined || items.length <= 0 ) {
      error({ statusCode: 404, message: 'No Ascension Packages found!' });
    }

    const groupFilterSelections = [];
    if ( query['filter-group'] ) {
      //factionFilterSelections.push(query['filter-faction']);
    }

    return {
      items: items,
    };
  },
  data() {
    return {
      breadcrumbItems: [
        { text: '', disabled: false, nuxt: true, exact: true, to: '/' },
        { text: 'Library', disabled: false, nuxt: true, exact: true, to: '/library' },
        { text: 'Ascension Packages', disabled: false, nuxt: true, exact: true, to: '/library/ascension-packages' },
      ],
      searchQuery: '',
      selectedTypeFilters: [],
      filters: {
        source: { model: [], label: 'Filter by Homebrew' },
      },
      pagination: {
        page: 1,
        pageCount: 0,
        sortBy: 'title',
        rowsPerPage: 25,
      },
      headers: [
        { text: 'Name', align: 'start', value: 'name', class: '' },
        { text: 'Hint', align: 'start', value: 'hint', class: '' },
        { text: 'Source', align: 'start', value: 'source.book', class: '' },
      ],
      expand: false,
    };
  },
  computed: {
    activeRepository() {
      return this.items;
    },
    filterSourceOptions() {
      let options = this.activeRepository.map(i => { return {value: i.source.key, text: i.source.book} } );
      return [...new Set(options)].sort( (a, b) => a.text.localeCompare(b.text) );
    },
    searchResult() {
      if ( this.activeRepository === undefined ) {
        return [];
      }
      let filteredResults = this.activeRepository;

      let filter;

      filter = this.filters.source;
      if (filter.model.length > 0) {
        filteredResults = filteredResults.filter( i => filter.model.includes(i.source.key) );
      }

      return filteredResults;
    },
    filterSettingTierOptions() {
      return [
        { text: 'Show all tiers', value: 6 },
        { text: '1 - One among billions', value: 1 },
        { text: '2 - Stalwart Defenders', value: 2 },
        { text: '3 - Elite Guardians', value: 3 },
        { text: '4 - Heroic Operatives', value: 4 },
        { text: '5 - Agents of Fate', value: 5 },
      ];
    },
    filterSpeciesOptions() {
      let array = [];
      this.activeRepository.forEach( item => {
        array.push(...item.species)
      });
      const distinct = [ ...new Set(array) ];
      return distinct.sort();
    },
    filterGroupOptions() {
      const reduce = this.activeRepository.map( item => item.group );
      const distinct = [ ...new Set(reduce) ];
      return distinct.filter( d => d !== null ).sort();
    },
  },
  methods: {
  },
};
</script>

<style scoped lang="css">
</style>

