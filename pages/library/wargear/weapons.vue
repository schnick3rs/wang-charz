<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <dod-default-breadcrumbs :items="breadcrumbItems" />

    <v-row justify="center">

      <!-- Filter -->
      <v-col :cols="12">
        <v-card>
          <v-card-text>
            <v-row justify="center">
              <v-col :cols="12" :xs="6">
                <v-text-field
                    v-model="searchQuery"
                    filled
                    dense
                    clearable
                    label="Search"
                />
              </v-col>

              <v-col :cols="4" v-if="false">
                <v-select
                    v-model="filters.subtype.model"
                    :items="filtersSubtypeOptions"
                    :label="filters.subtype.label"
                    filled
                    dense
                    clearable
                    multiple
                    chips
                    deletable-chips
                    single-line
                />
              </v-col>

              <v-col :cols="4" v-if="false">
                <v-select
                    v-model="filters.traits.model"
                    :items="filterTraitsOptions"
                    :label="filters.traits.label"
                    filled
                    dense
                    clearable
                    multiple
                    chips
                    deletable-chips
                    single-line
                />
              </v-col>

              <v-col :cols="4" v-if="false">
                <v-select
                    v-model="filters.keywords.model"
                    :items="filterKeywordsOptions"
                    :label="filters.keywords.label"
                    filled
                    dense
                    clearable
                    multiple
                    chips
                    deletable-chips
                    single-line
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Table -->
      <v-col :cols="12">
        <v-card>
          <v-data-table
              :headers="headers"
              :items="searchResults"
              :page.sync="page"
              :items-per-page="itemsPerPage"
              :search="searchQuery"
              item-key="key"
              sort-by="name"
              hide-default-footer
              @page-count="pageCount = $event"
          >

            <template v-slot:item.name="{ item }">
              <v-row no-gutters>
                <v-col :cols="12">
                  {{ item.name }}
                </v-col>
                <v-col v-if="item.subtype" :cols="12" class="caption grey--text">
                  {{ item.subtype }}
                </v-col>
              </v-row>
            </template>

            <template v-slot:item.range="{ item }">
              <span v-if="item.meta && item.meta.length > 0">{{ item.meta[0].range }} m</span>
            </template>

            <template v-slot:item.damage="{ item }">
              <div v-if="item.meta && item.meta.length > 0 && item.meta[0].damage">
                <span v-if="item.type==='Melee Weapon'">{{ item.meta[0].damage.static }}*</span>
                <span v-else>{{ item.meta[0].damage.static }}</span>
                <span> + </span>
                <span>{{ item.meta[0].damage.ed }} ED</span>
              </div>
            </template>

            <template v-slot:item.ap="{ item }">
              <span v-if="item.meta && item.meta.length > 0">{{ item.meta[0].ap }}</span>
            </template>

            <template v-slot:item.salvo="{ item }">
              <span v-if="item.meta && item.meta.length > 0">{{ item.meta[0].salvo }}</span>
            </template>

            <template v-slot:item.traits="{ item }">
              <span v-if="item.meta && item.meta.length > 0 && item.meta[0].traits && item.meta[0].traits.length >0">{{ item.meta[0].traits.join(', ') }}</span>
            </template>

            <template v-slot:item.source.book="{ item }">
              <v-row no-gutters>
                <v-col :cols="12">
                  {{ item.source.book }}
                  <NuxtLink v-if="item.source.path" :to="item.source.path" target="_blank">
                    <v-icon small>
                      launch
                    </v-icon>
                  </NuxtLink>
                </v-col>
                <v-col v-if="item.source.page" :cols="12" class="caption grey--text">
                  pg. {{ item.source.page }}
                </v-col>
              </v-row>
            </template>

          </v-data-table>

          <div class="text-center pt-2">
            <v-pagination
              v-model="page"
              :length="pageCount"
            />
          </div>
        </v-card>
      </v-col>

      <v-col :cols="12">
        <v-card>
          <v-card-text />
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
  data() {
    return {
      searchQuery: '',
      settingFilter: [],
      contentFilter: [],
      filters: {
        subtype: {
          model: [],
          label: 'Filter by Subtypes',
        },
        keywords: {
          model: [],
          label: 'Filter by Keywords',
        },
        traits: {
          model: [],
          label: 'Filter by Traits',
        },
      },
      page: 1,
      pageCount: 0,
      itemsPerPage: 25,
      headers: [
        { text: 'Name', align: 'left', value: 'name', class: '' },
        { text: 'Range', align: 'center', value: 'range', class: '' },
        { text: 'Damage', align: 'center', value: 'damage', class: '' },
        { text: 'AP', align: 'center', value: 'ap', class: '' },
        { text: 'Salvo', align: 'center', value: 'salvo', class: '' },
        { text: 'Traits', align: 'left', value: 'traits', class: '' },
        { text: 'Source', align: 'left', value: 'source.book', class: '' },
      ],
      expand: false,
    };
  },
  computed: {
    weapons() {
      return this.wargearRepository.filter((gear) => ['Ranged Weapon', 'Melee Weapon'].includes(gear.type));
    },
    breadcrumbItems() {
      return [
        {
          text: '', disabled: false, nuxt: true, exact: true, to: '/',
        },
        {
          text: 'Library', disabled: false, nuxt: true, exact: true, to: '/library',
        },
        {
          text: 'Wargear', disabled: false, nuxt: true, exact: true, to: '/library/wargear',
        },
        {
          text: 'Weapons', disabled: false, nuxt: true, exact: true, to: '/library/wargear/weapons',
        },
      ];
    },
    searchResults() {
      let filteredResults = this.weapons;

      if (this.searchQuery) {
        // filteredResults = filteredResults.filter(h => (h.title.toLowerCase().indexOf(this.searchQuery.toLowerCase()) >= 0))
      }

      if (this.filters.keywords.model.length > 0) {
        filteredResults = filteredResults.filter((item) => this.filters.keywords.model.some((m) => item.keywords.includes(m)));
      }

      if (this.filters.traits.model.length > 0) {
        filteredResults = filteredResults.filter((item) => this.filters.traits.model.some((m) => item.meta[0].traits.includes(m)));
      }

      if (this.filters.subtype.model.length > 0) {
        filteredResults = filteredResults.filter((item) => this.filters.subtype.model.includes(item.subtype));
      }

      return filteredResults;
    },
    filtersSubtypeOptions() {
      const reduce = this.weapons.map((item) => item.subtype);
      const distinct = [...new Set(reduce)];
      return distinct.filter((d) => d !== null).sort();
    },
    filterKeywordsOptions() {
      const keywordArray = [];
      this.weapons.forEach((item) => {
        keywordArray.push(...item.keywords);
      });
      const distinctOptions = [...new Set(keywordArray)];
      return distinctOptions.filter((o) => o.indexOf('<') !== 0).sort();
    },
    filterTraitsOptions() {
      const traitArray = [];
      this.weapons.forEach((item) => {
        traitArray.push(...item.meta[0].traits);
      });
      const distinctOptions = [...new Set(traitArray)];
      return distinctOptions.sort();
    },
    pages() {
      if (this.pagination.rowsPerPage == null
        || this.pagination.totalItems == null
      ) return 0;

      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage);
    },
  },
  async asyncData({ app }) {
    const response = await app.$axios.get('/api/wargear/');
    return {
      wargearRepository: response.data,
    };
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
