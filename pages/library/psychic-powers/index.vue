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

              <v-col :cols="12">
                <v-chip-group
                  v-model="selectedDisciplinesFilters"
                  active-class="primary--text"
                  column
                  multiple
                >
                  <v-chip
                    v-for="filter in disciplineFilters"
                    :key="filter.name"
                    :value="filter.name"
                    filter
                    small
                    label
                  >
                    {{ filter.name }}
                    <em v-if="filter.name === 'Navigator Powers'" class="ml-1">(Pax)</em>
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
            hide-default-footer
            @page-count="pagination.pageCount = $event"
          />

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
import BreadcrumbSchemaMixin from '~/mixins/BreadcrumbSchemaMixin';
import SluggerMixin from '~/mixins/SluggerMixin';

export default {
  layout: 'psychic-powers',
  components: {
    DodDefaultBreadcrumbs,
  },
  mixins: [
    BreadcrumbSchemaMixin,
    SluggerMixin,
  ],
  head() {
    const title = 'Psychic Powers - Wrath & Glory Reference | Library';
    const description = 'Tap into the powers of the warp, but careful... you never know who\'s looking back';
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
      selectedDisciplinesFilters: [],
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
        // { text: '', align: 'center', value: 'avatar', class: '' },
        {
          text: 'Name', align: 'start', value: 'name', class: '',
        },
        {
          text: 'Effect', align: 'start', value: 'effect', class: '',
        },
        {
          text: 'Discipline', align: 'start', value: 'discipline', class: '',
        },
        {
          text: 'Cost', align: 'right', value: 'cost', class: '',
        },
        {
          text: 'Source', align: 'start', value: 'source.book', class: '',
        },
      ],
    };
  },
  computed: {
    searchResult() {
      if (this.repository === undefined) {
        return [];
      }
      let searchResult = this.repository;

      if (this.selectedDisciplinesFilters.length > 0) {
        searchResult = searchResult.filter((item) => this.selectedDisciplinesFilters.includes(item.discipline));
      }

      return searchResult;
    },
    disciplineFilters() {
      const reduceToType = this.repository.map((item) => item.discipline);
      const distinctTypes = [...new Set(reduceToType)];
      return distinctTypes.map((t) => ({ name: t }));
    },
    filterKeywordsOptions() {
      const keywordArray = [];
      this.repository.forEach((item) => {
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
          text: 'Psychic Powers', disabled: false, nuxt: true, exact: true, to: '/library/psychic-powers',
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
    const { data } = await app.$axios.get('/api/psychic-powers/');

    if (data === undefined || data.length <= 0) {
      error({ statusCode: 404, message: 'No Ascension Packages found!' });
    }

    return {
      repository: data,
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
    getAvatar(name) {
      return `/img/icon/psychic-disciplines/${this.textToKebab(name)}_avatar.jpg`;
    },
  },
};
</script>

<style scoped lang="css">
</style>
                                                                                                                                                                                                                                                                                                                                                                                           
