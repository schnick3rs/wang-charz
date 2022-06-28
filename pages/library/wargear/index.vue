<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <dod-default-breadcrumbs :items="breadcrumbItems" />

    <v-row justify="center">
      <v-col
        :cols="12"
      >
        <v-card>
          <v-card-text>
            <v-row justify="center">
              <v-col :cols="12">
                <v-text-field
                  v-model="searchQuery"
                  filled
                  dense
                  clearable
                  label="Search"
                />
              </v-col>

              <v-col :cols="12" :sm="6">
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


              <!-- filter species -->
              <v-col :cols="12" :sm="6">
                <v-select
                  v-model="filters.source.model"
                  :items="filterSourceOptions"
                  :label="filters.source.label"
                  filled
                  clearable
                  multiple
                  dense
                  single-line
                />
              </v-col>

              <v-col :cols="12">
                <v-chip-group
                  v-model="selectedTypeFilters"
                  active-class="primary--text"
                  column
                  multiple
                >
                  <v-chip
                    v-for="filter in typeFilters"
                    :key="filter.name"
                    :value="filter.name"
                    filter
                    small
                    label
                  >
                    {{ filter.name }}
                  </v-chip>
                </v-chip-group>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col :cols="12">
        <v-card>
          <v-data-table
            :headers="headers"
            :items="searchResult"
            :page.sync="pagination.page"
            :search="searchQuery"
            item-key="key"
            sort-by="name"
            show-expand
            hide-default-footer
            :items-per-page="25"
            @page-count="pagination.pageCount = $event"
          >
            <template v-slot:item.type="{ item }">
              {{ toTypeString(item) }}
            </template>
            <template v-slot:item.value="{ item }">
              {{ item.value }} {{ item.rarity }}
            </template>
            <!--
            <template v-slot:item.keywords="{ item }">
              {{ item.keywords.join(', ') }}
            </template>
            -->
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

            <!-- detail preview -->
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <div class="pt-4 pb-4">
                  <div>
                    <h3 class="title-1">
                      {{ item.name }}
                    </h3>
                    <h4 class="subtitle-2 grey--text">
                      {{ toTypeString(item) }}
                    </h4>

                    <hr class="mb-0">

                    <div class="grey--text">
                      <span class="subtitle-2"><strong>Rarity:</strong> {{ item.rarity }}</span>
                      <span><strong>Value:</strong> {{ item.value }}</span>
                    </div>

                    <div v-if="item.description" class="mt-2" v-html="item.description"></div>
                    <p v-else-if="item.snippet" class="mt-2">{{ item.snippet }}</p>

                    <dod-simple-weapon-stats
                      v-if="item.meta !== undefined && item.meta.length > 0 && ['ranged-weapon','melee-weapon'].includes(item.meta[0].type)"
                      :name="item.name"
                      :stats="item.meta[0]"
                      show-traits
                      class="mb-2"
                    />
                    <dod-simple-armour-stats
                      v-if="item.meta !== undefined && item.meta.length > 0 && ['armour'].includes(item.meta[0].type)"
                      :name="item.name"
                      :stats="item.meta[0]"
                      show-traits
                      class="mb-2"
                    />

                    <div>
                      <span>Keywords:</span>
                      <v-chip
                        v-for="keyword in item.keywords"
                        :key="keyword"
                        label
                        small
                        class="mr-1"
                      >
                        {{ keyword }}
                      </v-chip>
                    </div>
                  </div>

                  <div class="pt-4">
                    <v-btn
                      nuxt
                      :to="`/library/wargear/${item.key}`"
                      color="success"
                      small
                    >
                      Show Details Page
                    </v-btn>
                    <v-btn
                        v-if="!['core','fspg','red1','cos'].includes(item.source.key)"
                        :href="`/api/wargear/${item.key}?format=foundry`"
                        download
                        small
                        color="warning"
                    >foundry (.json)</v-btn>
                  </div>
                </div>
              </td>
            </template>
          </v-data-table>

          <div class="text-center pt-2">
            <v-pagination
              v-model="pagination.page"
              :length="pagination.pageCount"
            />
          </div>
        </v-card>
      </v-col>

      <v-col :cols="12">
        <v-card>
          <v-card-text>
            <h1>Search the Library for available wargear</h1>
            <p>
              This is a reference table for the wargear used in the Wrath and Glory Role Playing Game.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import DodDefaultBreadcrumbs from '~/components/DodDefaultBreadcrumbs';
  import DodSimpleWeaponStats from '~/components/DodSimpleWeaponStats';
  import DodSimpleArmourStats from '~/components/DodSimpleArmourStats';
  import BreadcrumbSchemaMixin from '~/mixins/BreadcrumbSchemaMixin';
  import SluggerMixin from '~/mixins/SluggerMixin';

export default {
  layout: 'library',
  components: {
    DodDefaultBreadcrumbs,
    DodSimpleArmourStats,
    DodSimpleWeaponStats,
  },
  mixins: [
    BreadcrumbSchemaMixin,
    SluggerMixin,
  ],
  head() {
    const title = 'Wargear - Wrath & Glory Reference | Library';
    const description = 'Aha! The armoury. Check out those juicy items for you characters.';
    const image = 'https://www.doctors-of-doom.com/img/artwork_library.jpg';

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
  async asyncData({ $axios, query, params, error }) {
    const response = await $axios.get('/api/wargear/');
    const { data } = response;

    if (data === undefined || data.length <= 0) {
      error({ statusCode: 404, message: 'No Wargear found!' });
    }

    const filtersSourceModel = [];
    if (query['filter-source']) {
      filtersSourceModel.push(query['filter-source']);
    }

    return {
      items: data,
      filters: {
        source: { model: filtersSourceModel, label: 'Filter by Homebrew' },
        keywords: { model: [], label: 'Filter by Keywords' },
      },
    };
  },
  data() {
    return {
      searchQuery: '',
      selectedTypeFilters: [],
      pagination: {
        page: 1,
        pageCount: 0,
        sortBy: 'title',
        rowsPerPage: 25,
      },
      headers: [
        { text: 'Name', align: 'left', value: 'name', class: '' },
        { text: 'Type', align: 'left', value: 'type', class: '' },
        { text: 'Value', align: 'left', value: 'value', class: '' },
        //{ text: 'Keywords', align: 'left', value: 'keywords', class: '' },
        { text: 'Source', align: 'start', value: 'source.book', class: '' },
      ],
    };
  },
  computed: {
    activeRepository() {
      return this.items;
    },
    searchResult() {
      if (this.activeRepository === undefined) {
        return [];
      }
      let filteredResults = this.activeRepository;

      if (this.selectedTypeFilters.length > 0) {
        filteredResults = filteredResults.filter((item) => this.selectedTypeFilters.includes(item.type));
      }

      let filter;

      filter = this.filters.keywords;
      if (filter.model.length > 0) {
        filteredResults = filteredResults.filter((i) => filter.model.some((m) => i.keywords.includes(m)));
      }

      filter = this.filters.source;
      if (filter.model.length > 0) {
        filteredResults = filteredResults.filter((i) => filter.model.includes(i.source.key));
      }

      return filteredResults;
    },
    typeFilters() {
      const reduceToType = this.activeRepository.map((item) => item.type);
      const distinctTypes = [...new Set(reduceToType)];
      return distinctTypes.map((t) => ({ name: t }));
    },
    filterKeywordsOptions() {
      const keywordArray = [];
      this.activeRepository.forEach((item) => {
        keywordArray.push(...item.keywords);
      });
      const distinctOptions = [...new Set(keywordArray)];
      return distinctOptions.filter((o) => o.indexOf('<') !== 0).sort();
    },
    filterSourceOptions() {
      const options = this.activeRepository.map((i) => ({ value: i.source.key, text: i.source.book }));
      return [...new Set(options)].sort((a, b) => a.text.localeCompare(b.text));
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
      ];
    },
    pages() {
      if (this.pagination.rowsPerPage == null
        || this.pagination.totalItems == null
      ) return 0;

      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage);
    },
  },
  methods: {
    toTypeString(item) {
      const types = [item.type];
      if (item.subtype) {
        types.push(item.subtype);
      }
      return types.join(' • ');
    },
    toggleTypeFilter(name) {
      if (this.selectedTypeFilters.includes(name)) {
        this.selectedTypeFilters = this.selectedTypeFilters.filter((d) => d != name);
      } else {
        this.selectedTypeFilters.push(name);
      }
    },
  },
};
</script>

<style scoped lang="css">
</style>
                                                                                                                                                                                                                                                                                                                                                                                           
