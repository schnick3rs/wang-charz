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

              <v-col :cols="6">
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
            item-key="name"
            sort-by="name"
            show-expand
            hide-default-footer
            @page-count="pagination.pageCount = $event"
          >
            <template v-slot:item.type="{ item }">
              {{ toTypeString(item) }}
            </template>
            <template v-slot:item.value="{ item }">
              {{ item.value }} {{ item.rarity }}
            </template>
            <template v-slot:item.keywords="{ item }">
              {{ item.keywords.join(', ') }}
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

                    <p class="mt-2">
                      {{ item.description }}
                    </p>

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
                      :to="`/library/wargear/${item.id}-${textToKebab(item.name)}`"
                      color="success"
                      small
                    >
                      Show Details Page
                    </v-btn>
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
  data() {
    return {
      searchQuery: '',
      selectedTypeFilters: [],
      filters: {
        keywords: {
          model: [],
          label: 'Filter by Keywords',
        },
      },
      pagination: {
        page: 1,
        pageCount: 0,
        sortBy: 'title',
        rowsPerPage: 25,
      },
      headers: [
        {
          text: 'Name', align: 'left', value: 'name', class: '',
        },
        {
          text: 'Type', align: 'left', value: 'type', class: '',
        },
        {
          text: 'Value', align: 'left', value: 'value', class: '',
        },
        {
          text: 'Keywords', align: 'left', value: 'keywords', class: '',
        },
      ],
    };
  },
  computed: {
    searchResult() {
      if (this.wargearRepository === undefined) {
        return [];
      }
      let searchResult = this.wargearRepository;

      console.log(this.selectedTypeFilters);
      if (this.selectedTypeFilters.length > 0) {
        searchResult = searchResult.filter((item) => this.selectedTypeFilters.includes(item.type));
      }

      return searchResult;
    },
    typeFilters() {
      const reduceToType = this.wargearRepository.map((item) => item.type);
      const distinctTypes = [...new Set(reduceToType)];
      const types = distinctTypes.map((t) => ({ name: t }));
      return types;
    },
    filterKeywordsOptions() {
      const keywordArray = [];
      this.wargearRepository.forEach((item) => {
        keywordArray.push(...item.keywords);
      });
      const distinctOptions = [...new Set(keywordArray)];
      return distinctOptions.filter((o) => o.indexOf('<') !== 0).sort();
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
  async asyncData({ app }) {
    const response = await app.$axios.get('/api/wargear/');
    const items = response.data;

    if (items === undefined || items.length <= 0) {
      error({ statusCode: 404, message: 'No Ascension Packages found!' });
    }

    return {
      wargearRepository: items,
    };
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
