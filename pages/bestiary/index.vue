<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <!-- Breadcrumbs -->
    <dod-default-breadcrumbs :items="breadcrumbItems" />

    <v-row justify="center">
      <!-- FILTER -->
      <v-col :cols="12">
        <v-card>
          <v-card-text>
            <v-row justify="center">
              <v-col v-if="false" :cols="12">
                <v-slide-group
                  multiple
                  show-arrows
                  :value="factionFilterSelections"
                >
                  <v-slide-item
                    v-for="faction in filterFactionOptions"
                    :key="faction.key"
                    v-slot:default="{ active, toggle }"
                  >
                    <v-avatar
                      size="86"
                      class="faction-filter"
                      :input-value="active"
                      @click="toggle"
                    >
                      <img :src="getAvatar(faction)">
                    </v-avatar>
                  </v-slide-item>
                </v-slide-group>
              </v-col>

              <v-col :cols="12" :sm="6">
                <v-text-field
                  v-model="searchQuery"
                  filled
                  dense
                  clearable
                  append-icon="search"
                  label="Search"
                />
              </v-col>

              <v-col :cols="12" :sm="6">
                <v-select
                  v-model="filtersSourceModel"
                  :items="filterSourceOptions"
                  filled
                  dense
                  clearable
                  multiple
                  single-line
                  label="Filter by Source/Homebrew"
                />
              </v-col>

              <v-col :cols="12" :sm="6">
                <v-slider
                  v-model="filterTier"
                  label="Set Campaign Tier"
                  min="0"
                  max="5"
                  thumb-label="always"
                />
              </v-col>

              <v-col :cols="12" :sm="6">
                <v-select
                  v-model="factionFilterSelections"
                  :items="filterFactionOptions"
                  label="Filter by Faction"
                  filled
                  dense
                  clearable
                  multiple

                  deletable-chips
                  single-line
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- TABLE -->
      <v-col :cols="12">
        <v-card>
          <v-data-table
            :headers="headers"
            :items="searchResults"
            :expanded.sync="expanded"
            :search="searchQuery"
            :page.sync="pagination.page"
            item-key="key"
            sort-by="name"
            show-expand
            hide-default-footer
            @item-expanded="trackExpand"
            @page-count="pagination.pageCount = $event"
          >
            <template v-slot:item.classification="{ item }">
              <div v-if="item.classification">
                <v-chip
                  v-if="item.classification.length === 1"
                  :color="getClassificationColor(item.classification[0])"
                  x-small
                  label
                >
                  {{ item.classification[0] }}
                </v-chip>
                <v-chip
                  v-else-if="filterTier > 0"
                  :color="getClassificationColor(item.classification[filterTier-1])"
                  x-small
                  label
                >
                  {{ item.classification[filterTier-1] }}
                </v-chip>

                <v-chip-group v-else multiple>
                  <v-chip
                    v-for="classification in item.classification"
                    :key="classification.key"
                    :color="getClassificationColor(classification)"
                    x-small
                    label
                  >
                    {{ classification.substr(0,1) }}
                  </v-chip>
                </v-chip-group>
              </div>
            </template>

            <template v-slot:item.name="{ item }">
              <v-row no-gutters>
                <v-col :cols="12">
                  {{ item.name }}
                </v-col>
                <v-col v-if="item.keywords" :cols="12" class="caption grey--text">
                  {{ item.keywords.filter(k=>k.indexOf('<')!==0).join(' • ') }}
                </v-col>
              </v-row>
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

            <!-- Detail Page link -->
            <template v-slot:item.actions="{ item }">
              <v-btn v-if="item.key && (item.stub === undefined || !item.stub)" small icon nuxt :to="`/bestiary/${camelToKebab(item.key)}`">
                <v-icon>chevron_right</v-icon>
              </v-btn>
            </template>

            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <div class="pa-4">
                  <dod-threat-details :item="item" />

                  <v-btn
                    nuxt
                    :to="`/bestiary/${camelToKebab(item.key)}`"
                    color="success"
                  >
                    Show Details Page
                  </v-btn>
                </div>
              </td>
            </template>
          </v-data-table>

          <div class="text-center pt-2">
            <v-pagination v-model="pagination.page" :length="pagination.pageCount" />
          </div>
        </v-card>
      </v-col>

      <v-col :cols="12">
        <v-card>
          <v-card-text>
            <h1 class="headline">
              Search the bestiary for homebrew threats to enrich your Wrath and Glory Campaign
            </h1>
            <p>
              Using the same threats within your Wrath and Glory campaign over and over?
              Never leave your players bored again! search throu this growing collection of adversaries
              derived from the various content provided by the fans. Check out the respective brews
              within the <nuxt-link to="/vault">
                Vault
              </nuxt-link>.
            </p>
            <p>
              If you have any feedback, or want to add your brews to the collection, you can mail me at
              <a href="mailto:docsofdoom+bestiary@gmail.com?subject=Bestiary Feedback">docsofdoom+bestiary(at)gmail.com</a>.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import DodDefaultBreadcrumbs from '~/components/DodDefaultBreadcrumbs';
import DodThreatDetails from '~/components/DodThreatDetails';
import SluggerMixin from '~/mixins/SluggerMixin';

export default {
  components: {
    DodDefaultBreadcrumbs,
    DodThreatDetails,
  },
  mixins: [
    SluggerMixin,
  ],
  head() {
    const breadcrumbListSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: this.breadcrumbItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: (index === 0 ? 'Doctors of Doom' : item.text),
        item: `https://www.doctors-of-doom.com${item.to}`,
      })),
    };

    const title = 'Threats for Wrath & Glory | Bestiary';
    const description = 'This Bestiary contains fan-made homebews threats to be used by the Game Master to challenge your Wrath & Glory Players. '
      + 'Filter by Campaign Tier and Faction to find various Troops of Mobs, Elite Champions and Adversaries.';
    const image = 'https://www.doctors-of-doom.com/img/artwork_bestiary_death.png';
    const imageTwitter = 'https://www.doctors-of-doom.com/img/artwork_bestiary_twitter.png';

    return {
      title,
      meta: [
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:title', name: 'og:title', content: title },
        { hid: 'og:description', name: 'og:description', content: description },

        // Open Graph
        { hid: 'og:image', name: 'og:image', content: image },

        // Twitter
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'twitter:title', name: 'twitter:title', content: title },
        { hid: 'twitter:description', name: 'twitter:description', content: description },
        { hid: 'twitter:image', name: 'twitter:image', content: imageTwitter },
      ],
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        { innerHTML: JSON.stringify(breadcrumbListSchema), type: 'application/ld+json' },
      ],
    };
  },
  data() {
    return {
      searchQuery: '',
      settingFilter: [],
      contentFilter: [],
      factionFilterSelections: [],
      pagination: {
        page: 1,
        pageCount: 0,
        sortBy: 'name',
        rowsPerPage: 25,
      },
      headers: [
        {
          text: 'Classification', align: 'center', value: 'classification', class: '',
        },
        // { text: '',               align: 'center',  value: 'avatar',          class: '' },
        {
          text: 'Name', align: 'start', value: 'name', class: '',
        },
        {
          text: 'Faction', align: 'start', value: 'faction', class: '',
        },
        {
          text: 'Source', align: 'start', value: 'source.book', class: '',
        },
        {
          text: '', align: 'end', value: 'actions', class: '', sortable: false,
        },
      ],
      expanded: [],
    };
  },
  computed: {
    breadcrumbItems() {
      return [
        {
          text: '', nuxt: true, exact: true, to: '/',
        },
        {
          text: 'Bestiary', nuxt: true, exact: true, to: '/bestiary',
        },
      ];
    },
    settingOptions() {
      return null;
      // return this.homebrewRepository.map(h => h.setting).filter(i => i !== '');
    },
    filterFactionOptions() {
      const options = this.items.map((i) => ({ value: i.faction, text: i.faction }));
      return [...new Set(options)].sort((a, b) => a.text.localeCompare(b.text));
    },
    filterSourceOptions() {
      const options = this.items.map((i) => ({ value: i.source.key, text: i.source.book }));
      return [...new Set(options)].sort((a, b) => a.text.localeCompare(b.text));
    },
    contentOptions() {
      const contentOptions = [];
      return [...new Set(contentOptions)].sort();
    },
    searchResults() {
      let filteredResults = this.items;

      if (this.filtersSourceModel.length > 0) {
        filteredResults = filteredResults.filter((i) => this.filtersSourceModel.includes(i.source.key));
      }

      if (this.factionFilterSelections.length > 0) {
        filteredResults = filteredResults.filter((i) => this.factionFilterSelections.includes(i.faction));
      }

      return filteredResults;
    },
    pages() {
      if (this.pagination.rowsPerPage == null
        || this.pagination.totalItems == null
      ) return 0;

      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage);
    },
  },
  async asyncData({
    $axios, query, params, error,
  }) {
    const response = await $axios.get('/api/threats/');
    const items = response.data;

    if (items === undefined || items.length <= 0) {
      error({ statusCode: 404, message: 'Threat not found' });
    }

    const factionFilterSelections = [];
    if (query['filter-faction']) {
      factionFilterSelections.push(query['filter-faction']);
    }

    let filterTier = 0;
    if (query['filter-tier']) {
      filterTier = query['filter-tier'];
    }

    const filtersSourceModel = [];
    if (query['filter-source']) {
      filtersSourceModel.push(query['filter-source']);
    }

    return {
      items,
      factionFilterSelections,
      filterTier,
      filtersSourceModel,
    };
  },
  methods: {
    getAvatar(factionLabel) {
      if (factionLabel !== undefined) {
        return `/img/bestiary/faction_${this.textToKebab(factionLabel)}_avatar.png`;
      }
      return '/img/avatars/species/core-human.png';
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    },
    toggleFilterFactionSelection(name) {
      if (this.factionFilterSelections.includes(name)) {
        this.factionFilterSelections = this.factionFilterSelections.filter((d) => d != name);
      } else {
        this.factionFilterSelections.push(name);
      }
    },
    trackExpand(event) {
      if (event.value === true) {
        this.$ga.event('Bestiary Row', 'expand', this.camelToKebab(event.item.key), 1);
      }
    },
    getClassificationColor(classification) {
      switch (classification) {
        case 'Troops': return 'green';
        case 'Elite': return 'yellow';
        case 'Adversary': return 'orange';
      }
    },
  },
};
</script>

<style scoped lang="scss">
  tr:hover {
    cursor: pointer;
  }

  .faction-filter {
    opacity: 0.5;
  }

  .faction-filter.v-slide-item--active {
    opacity: unset;
  }

</style>
