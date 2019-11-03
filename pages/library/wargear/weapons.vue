<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <div>

    <dod-default-breadcrumbs v-bind:items="breadcrumbItems" />

    <v-row justify="center">

      <v-col v-bind:cols="11">

        <v-card>

          <v-card-text>

            <v-row justify-center row wrap>

              <v-col v-bind:cols="12" v-bind:xs="6">

                <v-text-field
                  v-model="searchQuery"
                  filled
                  dense
                  clearable
                  label="Search"></v-text-field>

              </v-col>

              <v-col v-bind:cols="4">
                <v-select
                  v-model="filters.subtype.model"
                  v-bind:items="filtersSubtypeOptions"
                  v-bind:label="filters.subtype.label"
                  filled
                  dense
                  clearable
                  multiple
                  chips
                  deletable-chips
                  single-line
                >
                </v-select>
              </v-col>

              <v-col v-bind:cols="4">
                <v-select
                  v-model="filters.traits.model"
                  v-bind:items="filterTraitsOptions"
                  v-bind:label="filters.traits.label"
                  filled
                  dense
                  clearable
                  multiple
                  chips
                  deletable-chips
                  single-line
                >
                </v-select>
              </v-col>

              <v-col v-bind:cols="4">
                <v-select
                  v-model="filters.keywords.model"
                  v-bind:items="filterKeywordsOptions"
                  v-bind:label="filters.keywords.label"
                  filled
                  dense
                  clearable
                  multiple
                  chips
                  deletable-chips
                  single-line
                >
                </v-select>

              </v-col>

            </v-row>

          </v-card-text>

        </v-card>

      </v-col>

      <v-col v-bind:cols="11">
        <v-card>
          <v-data-table
            v-bind:headers="headers"
            v-bind:items="searchResults"
            v-bind:page.sync="pagination.page"
            v-bind:search="searchQuery"
            v-on:page-count="pagination.pageCount = $event"
            item-key="name"
            sort-by="name"
            hide-default-footer
          >
            <template v-slot:item="{ item }">
              <tr>
                <td>{{ item.name }}</td>
                <td>{{ item.subtype }}</td>
                <td class="text-sm-center">
                  <div v-if="item.meta && item.meta.length > 0 && item.meta[0].damage">
                    <span v-if="item.type==='Melee Weapon'">{{ item.meta[0].damage.static }}*</span>
                    <span v-else>{{ item.meta[0].damage.static }}</span>
                    <span> + </span>
                    <span>{{ item.meta[0].damage.ed }} ED</span>
                  </div>
                </td>
                <td class="text-sm-center">
                  <span v-if="item.meta && item.meta.length > 0">{{ item.meta[0].ap }}</span>
                </td>
                <td class="text-sm-center">
                  <span v-if="item.meta && item.meta.length > 0">{{ item.meta[0].salvo }}</span>
                </td>
                <td class="text-sm-center">
                  <span v-if="item.meta && item.meta.length > 0">{{ item.meta[0].range }} m</span>
                </td>
                <td>
                  <span v-if="item.meta && item.meta.length > 0 && item.meta[0].traits && item.meta[0].traits.length >0">{{ item.meta[0].traits.join(', ') }}</span>
                </td>
                <td>{{ item.keywords.join(', ') }}</td>
              </tr>
            </template>

          </v-data-table>

          <div class="text-center pt-2">
            <v-pagination
              v-model="pagination.page"
              v-bind:length="pagination.pageCount"
            />
          </div>
        </v-card>
      </v-col>

      <v-col v-bind:cols="12">

        <v-card>
          <v-card-text>
          </v-card-text>
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
    return {
      title: 'Weapons - Wrath & Glory Wargear Reference | Library',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '',
        },
      ],
    };
  },
  layout: 'library',
  async asyncData({ app }) {
    const response = await app.$axios.get(`/api/wargear/`);
    return {
      wargearRepository: response.data,
    };
  },
  data() {
    return {
      searchQuery: '',
      settingFilter: [],
      contentFilter: [],
      filters: {
        subtype: {
          model: [],
          label: 'Filter by Subtypes'
        },
        keywords: {
          model: [],
          label: 'Filter by Keywords'
        },
        traits: {
          model: [],
          label: 'Filter by Traits'
        },
      },
      pagination: {
        page: 1,
        pageCount: 0,
        sortBy: 'title',
        rowsPerPage: 25,
      },
      headers: [
        { text: 'Name', align: 'left', value: 'name', class: '' },
        { text: 'Subtype', align: 'left', value: 'subtype', class: '' },
        { text: 'Damage', align: 'center', value: 'damage', class: '' },
        { text: 'AP', align: 'center', value: 'ap', class: '' },
        { text: 'Salvo', align: 'center', value: 'salvo', class: '' },
        { text: 'Range', align: 'center', value: 'range', class: '' },
        { text: 'Traits', align: 'left', value: 'traits', class: '' },
        { text: 'Keywords', align: 'left', value: 'keywords', class: '' },
      ],
      expand: false,
    };
  },
  computed: {
    weapons() {
      return this.wargearRepository.filter( gear => ['Ranged Weapon', 'Melee Weapon'].includes(gear.type));
    },
    breadcrumbItems() {
      return [
        { text: '', disabled: false, nuxt: true, exact: true, to: '/' },
        { text: 'Library', disabled: false, nuxt: true, exact: true, to: '/library' },
        { text: 'Wargear', disabled: false, nuxt: true, exact: true, to: '/library/wargear' },
        { text: 'Weapons', disabled: false, nuxt: true, exact: true, to: '/library/wargear/weapons' },
      ];
    },
    searchResults() {
      let filteredResults = this.weapons;

      if (this.searchQuery) {
        //filteredResults = filteredResults.filter(h => (h.title.toLowerCase().indexOf(this.searchQuery.toLowerCase()) >= 0))
      }

      if (this.filters.keywords.model.length > 0) {
        filteredResults = filteredResults.filter( item => this.filters.keywords.model.some( m => item.keywords.includes(m) ));
      }

      if (this.filters.traits.model.length > 0) {
        filteredResults = filteredResults.filter( item => this.filters.traits.model.some( m => item.meta[0].traits.includes(m) ));
      }

      if (this.filters.subtype.model.length > 0) {
        filteredResults = filteredResults.filter( item => this.filters.subtype.model.includes(item.subtype) );
      }

      return filteredResults;
    },
    filtersSubtypeOptions() {
      const reduce = this.weapons.map( item => item.subtype );
      const distinct = [ ...new Set(reduce) ];
      return distinct.filter( d => d !== null ).sort();
    },
    filterKeywordsOptions() {
      let keywordArray = [];
      this.weapons.forEach( item => {
        keywordArray.push(...item.keywords)
      });
      const distinctOptions = [ ...new Set(keywordArray) ];
      return distinctOptions.filter( o => o.indexOf('<') !== 0 ).sort();
    },
    filterTraitsOptions() {
      let traitArray = [];
      this.weapons.forEach( item => {
        traitArray.push(...item.meta[0].traits)
      });
      const distinctOptions = [ ...new Set(traitArray) ];
      return distinctOptions.sort();
    },
    pages() {
      if (this.pagination.rowsPerPage == null
        || this.pagination.totalItems == null
      ) return 0;

      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage);
    },
  },
  methods: {
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    },
  },
};
</script>

<style scoped lang="css">
</style>
