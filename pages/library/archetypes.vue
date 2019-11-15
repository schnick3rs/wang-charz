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

              <v-col v-bind:cols="12" v-bind:sm="6">
                <v-select
                v-model="filters.settingTier.model"
                v-bind:items="filterSettingTierOptions"
                label="Setting Tier (Max Tier)"
                filled
                dense
                >
                </v-select>
              </v-col>

              <!-- filter species -->
              <v-col v-bind:cols="12" v-bind:sm="4">
                <v-select
                  v-model="filters.species.model"
                  v-bind:items="filterSpeciesOptions"
                  v-bind:label="filters.species.label"
                  chips
                  filled
                  clearable
                  multiple
                  deletable-chips
                  dense
                >
                </v-select>
              </v-col>

              <!-- filter group -->
              <v-col v-bind:cols="12" v-bind:sm="4">
                <v-select
                  v-model="filters.group.model"
                  v-bind:items="filterGroupOptions"
                  v-bind:label="filters.group.label"
                  chips
                  filled
                  clearable
                  multiple
                  deletable-chips
                  dense
                >
                </v-select>
              </v-col>

              <!-- filter source -->
              <v-col v-bind:cols="12" v-bind:sm="4">
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
            v-on:page-count="pagination.pageCount = $event"
            item-key="key"
            sort-by="name"
            hide-default-footer
          >

            <template v-slot:item.species="{ item }">{{ item.species.join(', ') }}</template>

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
import ArchetypePreview from '~/components/forge/ArchetypePreviewV2';
import ArchetypeRepositoryMixin from '~/mixins/ArchetypeRepositoryMixin';

export default {
  components: { DodDefaultBreadcrumbs, ArchetypePreview },
  mixins: [ ArchetypeRepositoryMixin ],
  head() {
    return {
      title: 'Archetypes - Wrath & Glory Reference | Library',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '',
        },
      ],
    };
  },
  async asyncData({ $axios, query, params, error }) {

    const response = await $axios.get(`/api/archetypes/`);
    const items = response.data;

    if ( items === undefined || items.length <= 0 ) {
      error({ statusCode: 404, message: 'No Archetypes found!' });
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
        { text: 'Archetypes', disabled: false, nuxt: true, exact: true, to: '/library/archetypes' },
      ],
      searchQuery: '',
      selectedTypeFilters: [],
      filters: {
        settingTier: { model: 6, label: 'Filter by Archetype-Group' },
        species: { model: [], label: 'Filter by Species' },
        group: { model: [], label: 'Filter by Archetype-Group' },
        source: { model: [], label: 'Filter by Homebrew' },
      },
      pagination: {
        page: 1,
        pageCount: 0,
        sortBy: 'title',
        rowsPerPage: 25,
      },
      headers: [
        { text: 'Name', align: 'left', value: 'name', class: '' },
        { text: 'Group', align: 'left', value: 'group', class: '' },
        { text: 'Species', align: 'left', value: 'species', class: '' },
        { text: 'Tier', align: 'center', value: 'tier', class: '' },
        { text: 'Cost', align: 'center', value: 'cost', class: '' },
        { text: 'Source', align: 'left', value: 'source.book', class: '' },
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

      filter = this.filters.settingTier;
      if (filter.model) {
        filteredResults = filteredResults.filter( i => i.tier <= filter.model );
      }

      filter = this.filters.source;
      if (filter.model.length > 0) {
        filteredResults = filteredResults.filter( i => filter.model.includes(i.source.key) );
      }

      filter = this.filters.species;
      if (filter.model.length > 0) {
        filteredResults = filteredResults.filter( item => filter.model.some( m => item.species.includes(m) ));
      }

      filter = this.filters.group;
      if (filter.model.length > 0) {
        filteredResults = filteredResults.filter( item => filter.model.includes(item.group) );
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

