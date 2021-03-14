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

              <v-col :cols="12" :sm="6">
                <v-select
                  v-model="filters.settingTier.model"
                  :items="filterSettingTierOptions"
                  label="Setting Tier (Max Tier)"
                  filled
                  dense
                />
              </v-col>

              <!-- filter species -->
              <v-col :cols="12" :sm="4">
                <v-select
                  v-model="filters.species.model"
                  :items="filterSpeciesOptions"
                  :label="filters.species.label"
                  filled
                  clearable
                  multiple
                  dense
                />
              </v-col>

              <!-- filter group -->
              <v-col :cols="12" :sm="4">
                <v-select
                  v-model="filters.faction.model"
                  :items="filterGroupOptions"
                  :label="filters.faction.label"
                  filled
                  clearable
                  multiple
                  dense
                />
              </v-col>

              <!-- filter source -->
              <v-col :cols="12" :sm="4">
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
            :items-per-page="25"
            item-key="key"
            sort-by="name"
            hide-default-footer
            @page-count="pagination.pageCount = $event"
          >
            <template v-slot:item.species="{ item }">
              <span v-for="species in item.species">
                {{ species.name }}
                <v-chip
                    v-if="species.sourceKey && !species.sourceKey.startsWith('c')"
                    color="info"
                    outlined
                    tags
                    x-small
                    label
                >{{species.sourceKey.toUpperCase()}}</v-chip>
              </span>
            </template>

            <template v-slot:item.source.book="{ item }">
              <v-row no-gutters>
                <v-col :cols="12">
                  {{ item.source.book }}
                  <nuxt-link v-if="item.source.path" :to="item.source.path" target="_blank">
                    <v-icon small>
                      launch
                    </v-icon>
                  </nuxt-link>
                </v-col>
                <v-col v-if="item.source.page" :cols="12" class="caption grey--text">
                  pg. {{ item.source.page }}
                </v-col>
              </v-row>
            </template>

            <!-- Detail Page link -->
            <template v-slot:item.actions="{ item }">
              <v-btn v-if="item.key && (item.stub === undefined || !item.stub)" small icon nuxt :to="`/library/archetypes/${camelToKebab(item.key)}`">
                <v-icon>chevron_right</v-icon>
              </v-btn>
            </template>

            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <archetype-preview
                  :item="item"
                  class="pa-2 pt-4 pb-4"
                />
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
import ArchetypePreview from '~/components/forge/ArchetypePreviewV2';
import BreadcrumbSchemaMixin from '~/mixins/BreadcrumbSchemaMixin';
import SluggerMixin from '~/mixins/SluggerMixin';

export default {
  components: { DodDefaultBreadcrumbs, ArchetypePreview },
  mixins: [
    BreadcrumbSchemaMixin,
    SluggerMixin,
  ],
  head() {
    const title = 'Archetypes - Wrath & Glory Reference | Library';
    const description = 'Oh there are way to many archetypes written by fans. Filter a little and then pick the one you want.'
      + ' Check the linked homebrews for details.';
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
          text: 'Archetypes', disabled: false, nuxt: true, exact: true, to: '/library/archetypes',
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
          text: 'Faction', align: 'start', value: 'faction', class: '',
        },
        {
          text: 'Species', align: 'start', value: 'species', class: '',
        },
        {
          text: 'Tier', align: 'center', value: 'tier', class: '',
        },
        {
          text: 'Cost', align: 'center', value: 'cost', class: '',
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
  computed: {
    activeRepository() {
      return this.items;
    },
    filterSourceOptions() {
      const options = this.activeRepository.map((i) => (
          {
            value: i.source.key,
            text: `${i.source.book}${i.source.version ? ' ('+i.source.version+')' : ''}`,
          }
      ));
      return [...new Set(options)].sort((a, b) => a.text.localeCompare(b.text));
    },
    searchResult() {
      if (this.activeRepository === undefined) {
        return [];
      }
      let filteredResults = this.activeRepository;

      let filter;

      filter = this.filters.settingTier;
      if (filter.model) {
        filteredResults = filteredResults.filter((i) => i.tier <= filter.model);
      }

      filter = this.filters.source;
      if (filter.model.length > 0) {
        filteredResults = filteredResults.filter((i) => filter.model.includes(i.source.key));
      }

      filter = this.filters.species;
      if (filter.model.length > 0) {
        filteredResults = filteredResults.filter((item) => filter.model.some((m) => item.species.map((s)=>s.name).includes(m)));
      }

      filter = this.filters.faction;
      if (filter.model.length > 0) {
        filteredResults = filteredResults.filter((item) => filter.model.includes(item.faction));
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
        const speciesNames = item.species.map((s)=>s.name);
        array.push(...speciesNames);
      });
      const distinct = [...new Set(array)];
      return distinct.filter((d) => d !== null && d !== undefined).sort();
    },
    filterGroupOptions() {
      const reduce = this.activeRepository.map((item) => item.faction);
      const distinct = [...new Set(reduce)];
      return distinct.filter((d) => d !== null && d !== undefined).sort();
    },
  },
  async asyncData({ $axios, query, error }) {
    const archetypeResponse = await $axios.get('/api/archetypes/');
    const items = archetypeResponse.data;

    if (items === undefined || items.length <= 0) {
      error({ statusCode: 404, message: 'No Archetypes found!' });
    }

    // TODO
    const factionGroupSelections = [];
    if (query['filter-group']) {
      factionGroupSelections.push(query['filter-group']);
    }

    const filtersSourceModel = [];
    if (query['filter-source']) {
      filtersSourceModel.push(query['filter-source']);
    }

    return {
      items,
      filters: {
        settingTier: { model: 6, label: 'Filter by Archetype-Group' },
        species: { model: [], label: 'Filter by Species' },
        faction: { model: factionGroupSelections, label: 'Filter by Faction' },
        source: { model: filtersSourceModel, label: 'Filter by Homebrew' },
      },
    };
  },
  methods: {
  },
};
</script>

<style scoped lang="css">
</style>
