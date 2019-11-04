<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <div>

    <dod-default-breadcrumbs v-bind:items="breadcrumbItems" />

    <v-row justify="center">

      <!-- filter -->
      <v-col v-bind:cols="12">

        <v-card>

          <v-card-text>

            <v-row justify-center row wrap>

              <v-col v-bind:cols="12" >

                <v-text-field
                  v-model="searchQuery"
                  filled
                  dense
                  clearable
                  label="Search"></v-text-field>
              </v-col>

              <v-col v-bind:cols="12">
                <v-chip-group
                  v-model="filters.species.model"
                  active-class="primary--text"
                  column
                  multiple
                >

                  <v-chip
                    v-for="filter in filterSpeciesOptions"
                    v-bind:key="filter"
                    v-bind:value="filter"
                    filter
                    small
                    label
                  >
                    {{filter}}
                  </v-chip>

                </v-chip-group>
              </v-col>

              <v-col v-bind:cols="12">
                <v-chip-group
                  v-model="filters.group.model"
                  active-class="primary--text"
                  column
                  multiple
                >

                  <v-chip
                    v-for="filter in filterGroupOptions"
                    v-bind:key="filter"
                    v-bind:value="filter"
                    filter
                    small
                    label
                  >
                    {{filter}}
                  </v-chip>

                </v-chip-group>
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
            item-key="name"
            sort-by="name"
            show-expand
            hide-default-footer
          >

            <template v-slot:item.species="{ item }">{{ item.species.join(', ') }}</template>
            <template v-slot:item.source="{ item }">
              <span v-if="item.source"></span>
              <span v-else>Core</span>
            </template>

            <template v-slot:expanded-item="{ headers, item }">
              <td v-bind:colspan="headers.length">
                <archetype-preview
                  v-bind:item="item"
                  class="mt-2"
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
        species: { model: [], label: 'Filter by Species' },
        group: { model: [], label: 'Filter by Archetype-Group' },
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
        { text: 'Source', align: 'left', value: 'source', class: '' },
      ],
      expand: false,
    };
  },
  computed: {
    activeRepository() {
      return this.archetypeRepository;
    },
    searchResult() {
      if ( this.activeRepository === undefined ) {
        return [];
      }
      let filteredResults = this.activeRepository;

      let filter = this.filters.species;
      if (filter.model.length > 0) {
        filteredResults = filteredResults.filter( item => filter.model.some( m => item.species.includes(m) ));
      }

      filter = this.filters.group;
      if (filter.model.length > 0) {
        filteredResults = filteredResults.filter( item => filter.model.includes(item.group) );
      }

      return filteredResults;
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

