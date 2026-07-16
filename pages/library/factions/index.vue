<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <!-- Breadcrumbs -->
    <dod-default-breadcrumbs :items="breadcrumbItems" />

    <v-row justify="center">
      <!-- filter -->
      <v-col :cols="12">
        <v-card>
          <v-card-text>
            <v-row justify="center">
              <v-col :cols="12" :sm="6">
                <v-text-field
                  v-model="searchQuery"
                  filled
                  dense
                  clearable
                  label="Search"
                />
              </v-col>

              <!-- filter factions -->
              <v-col :cols="12" :sm="6">
                <v-select
                  v-model="filters.source.model"
                  :items="filterSourceOptions"
                  :label="filters.source.label"
                  filled
                  clearable
                  multiple
                  dense
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
            :items="searchResult"
            :page.sync="pagination.page"
            :search="searchQuery"
            :items-per-page="15"
            item-key="key"
            sort-by="name"
            show-expand
            hide-default-footer
            @page-count="pagination.pageCount = $event"
          >

            <template #item.advancedCreationKeywords="{ item }">
              <v-chip v-for="keyword in item.advancedCreationKeywords" :key="keyword" class="ma-1" label>
                {{ keyword }}
              </v-chip>
            </template>
            <!-- Source Book -->
            <template #item.source.book="{ item }">
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

            <!-- Detail Page link -->
            <template #item.actions="{ item }">
              <v-btn v-if="item.stub === undefined || !item.stub" small icon nuxt :to="`/library/factions/${textToKebab(item.key)}`">
                <v-icon>chevron_right</v-icon>
              </v-btn>
            </template>

            <!-- Expand -->
            <template #expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <div class="pa-4">
                  <dod-faction-details
                    :item="item"
                    class="pa-2 pb-4"
                  />

                  <v-btn
                    v-if="item.stub === undefined || !item.stub"
                    nuxt
                    :to="`/library/factions/${textToKebab(item.key)}`"
                    color="success"
                  >
                    Show Details Page
                  </v-btn>
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
    </v-row>
  </div>
</template>

<script>
import DodDefaultBreadcrumbs from '~/components/DodDefaultBreadcrumbs';
import DodFactionDetails from '~/components/DodFactionDetails.vue';
import SluggerMixin from '~/mixins/SluggerMixin';
import BreadcrumbSchemaMixin from '~/mixins/BreadcrumbSchemaMixin';

export default {
  components: {
    DodDefaultBreadcrumbs,
    DodFactionDetails,
  },
  mixins: [
    BreadcrumbSchemaMixin,
    SluggerMixin,
  ],
  async asyncData({ $axios, query, params, error }) {
    const response = await $axios.get('/api/factions/');
    const { data } = response;

    if (data === undefined || data.length <= 0) {
      error({ statusCode: 404, message: 'No Ascension Packages found!' });
    }

    const groupFilterSelections = [];
    if (query['filter-group']) {
      // factionFilterSelections.push(query['filter-faction']);
    }

    const filtersSourceModel = [];
    if (query['filter-source']) {
      filtersSourceModel.push(query['filter-source']);
    }

    return {
      items: data,
      filters: {
        source: { model: filtersSourceModel, label: 'Filter by Homebrew' },
      },
    };
  },
  data() {
    return {
      breadcrumbItems: [
        {
          text: '', disabled: false, nuxt: true, exact: true, to: '/',
        },
        {
          text: 'Library', disabled: false, nuxt: true, exact: true, to: '/library',
        },
        {
          text: 'Factions', disabled: false, nuxt: true, exact: true, to: '/library/factions',
        },
      ],
      searchQuery: '',
      selectedTypeFilters: [],
      pagination: {
        page: 1,
        pageCount: 0,
        sortBy: 'title',
        rowsPerPage: 25,
      },
      headers: [
        {
          text: 'Name', align: 'start', value: 'name', class: '',
        },
        {
          text: 'Group', align: 'start', value: 'group', class: '',
        },
        {
          text: 'Associated Keywords', align: 'start', value: 'advancedCreationKeywords', class: '',
        },
        {
          text: 'Source', align: 'start', value: 'source.book', class: '',
        },
        {
          text: '', align: 'end', value: 'actions', class: '', sortable: false,
        },
      ],
      expand: false,
    };
  },
  head() {
    const title = 'Factions - Wrath & Glory Reference | Library';
    const description = 'There are some homebrew factions and human variants in addition to some Xenos options. '
      + 'Check out the respective linked Homebrews for detailed informations.';
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
  computed: {
    activeRepository() {
      return this.items;
    },
    filterSourceOptions() {
      const options = this.activeRepository.map((i) => ({ value: i.source.key, text: i.source.book }));
      return [...new Set(options)].sort((a, b) => a.text.localeCompare(b.text));
    },
    searchResult() {
      if (this.activeRepository === undefined) {
        return [];
      }
      let filteredResults = this.activeRepository;

      let filter;

      filter = this.filters.source;
      if (filter.model.length > 0) {
        filteredResults = filteredResults.filter((i) => filter.model.includes(i.source.key));
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
      const array = [];
      this.activeRepository.forEach((item) => {
        array.push(...item.factions);
      });
      const distinct = [...new Set(array)];
      return distinct.sort();
    },
    filterGroupOptions() {
      const reduce = this.activeRepository.map((item) => item.group);
      const distinct = [...new Set(reduce)];
      return distinct.filter((d) => d !== null).sort();
    },
  },
  methods: {
  },
};
</script>

<style scoped lang="css">
</style>
