<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <div>

    <!-- Breadcrumbs -->
    <dod-default-breadcrumbs v-bind:items="breadcrumbItems" />

    <v-row justify="center">

      <!-- FILTER -->
      <v-col v-bind:cols="12">

        <v-card>
          <v-card-text>

            <v-row justify="center">

              <v-col v-bind:cols="12" v-if="false">

                <v-slide-group
                  multiple
                  show-arrows
                  v-bind:value="factionFilterSelections"
                >
                  <v-slide-item
                    v-for="faction in filterFactionOptions"
                    v-bind:key="faction.key"
                    v-slot:default="{ active, toggle }"
                  >

                    <v-avatar
                      size="86"
                      class="faction-filter"
                      v-bind:input-value="active"
                      v-on:click="toggle"
                    >
                      <img v-bind:src="getAvatar(faction)">
                    </v-avatar>
                  </v-slide-item>

                </v-slide-group>

              </v-col>

              <v-col v-bind:cols="12" v-bind:sm="6">
                <v-text-field
                  v-model="searchQuery"
                  filled
                  dense
                  clearable
                  append-icon="search"
                  label="Search"
                ></v-text-field>
              </v-col>

              <v-col v-bind:cols="12" v-bind:sm="6">
                <v-select
                  v-model="filterSourceModel"
                  v-bind:items="filterSourceOptions"
                  filled
                  dense
                  clearable
                  multiple
                  chips
                  deletable-chips
                  single-line
                  label="Filter by Source/Homebrew"
                >
                </v-select>
              </v-col>

              <v-col v-bind:cols="12" v-bind:sm="6">

                <v-slider
                  v-model="filterTier"
                  label="Set Campaign Tier"
                  min="0"
                  max="5"
                  thumb-label="always"
                ></v-slider>

              </v-col>

              <v-col v-bind:cols="12" v-bind:sm="6">
                <v-select
                  v-model="factionFilterSelections"
                  v-bind:items="filterFactionOptions"
                  label="Filter by Faction"
                  filled
                  dense
                  clearable
                  multiple

                  deletable-chips
                  single-line
                >
                </v-select>
              </v-col>

            </v-row>
          </v-card-text>
        </v-card>

      </v-col>

      <!-- TABLE -->
      <v-col v-bind:cols="12">

        <v-card>
          <v-data-table
            v-bind:headers="headers"
            v-bind:items="searchResults"
            v-bind:expanded.sync="expanded"
            v-bind:search="searchQuery"
            v-on:item-expanded="trackExpand"
            sort-by="name"
            item-key="key"
            show-expand
            hide-default-footer
            v-bind:items-per-page="-1"
          >

            <template v-slot:item.classification="{ item }">
              <div v-if="item.classification">
                <v-chip
                  v-if="filterTier > 0"
                  v-bind:color="getClassificationColor(item.classification[filterTier-1])"
                  x-small
                  label
                >
                  {{ item.classification[filterTier-1] }}
                </v-chip>

                <v-chip-group multiple v-else>
                  <v-chip
                    v-for="classification in item.classification"
                    v-bind:key="classification.key"
                    v-bind:color="getClassificationColor(classification)"
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
                <v-col v-bind:cols="12">{{item.name}}</v-col>
                <v-col v-bind:cols="12" class="caption grey--text" v-if="item.keywords">{{item.keywords.filter(k=>k.indexOf('<')!==0).join(' • ')}}</v-col>
              </v-row>
            </template>

            <template v-slot:item.source.book="{ item }">
              {{item.source.book}}
              <NuxtLink v-if="item.source.path" v-bind:to="item.source.path" target="_blank"><v-icon small>launch</v-icon></NuxtLink>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-btn small icon nuxt v-bind:to="`/bestiary/${computeSlug(item.key)}`">
                <v-icon>chevron_right</v-icon>
              </v-btn>
            </template>

            <template v-slot:expanded-item="{ headers, item }">
              <td v-bind:colspan="headers.length">

                <div class="pa-4">

                  <dod-threat-details v-bind:item="item"></dod-threat-details>

                  <v-btn
                    nuxt
                    v-bind:to="`/bestiary/${computeSlug(item.key)}`"
                    color="success"
                  >Show Details Page</v-btn>

                </div>

              </td>
            </template>

          </v-data-table>

        </v-card>

      </v-col>

      <v-col v-bind:cols="12">

        <v-card>
          <v-card-text>
            <h1 class="headline">Search the bestiary for homebrew threats to enrich your Wrath and Glory Campaign</h1>
            <p>
              Using the same threats within your Wrath and Glory campaign over and over?
              Never leave your players bored again! search throu this growing collection of adversaries
              derived from the various content provided by the fans. Check out the respective brews
              within the <nuxt-link to="/vault">Vault</nuxt-link>.
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

export default {
  components: {
    DodDefaultBreadcrumbs,
    DodThreatDetails,
  },
  mixins: [],
  head() {

    const breadcrumbListSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": this.breadcrumbItems.map( (item, index) => {
        return {
          "@type": "ListItem",
          "position": index+1,
          "name": ( index === 0 ? 'Doctors of Doom' : item.text),
          "item": `https://www.doctors-of-doom.com${item.to}`
        }
      })
    };

    const title = 'Threats for the Game Master | Bestiary';
    const description =
      'This Bestiary contains fan-made homebews threats to be used by the Game Master to challenge your Wrath & Glory Players. ' +
      'Filter by Campaign Tier and Faction to find various Troops of Mobs, Elite Champions and Adversaries.';
    const image = 'https://www.doctors-of-doom.com/img/artwork_bestiary_death.png';

    return {
      title: title,
      meta: [
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:title', name: 'og:title', content: title },
        { hid: 'og:description', name: 'og:description', content: description },
        { hid: 'og:image', name: 'og:image', content: image },
      ],
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        { innerHTML: JSON.stringify(breadcrumbListSchema), type: 'application/ld+json' },
      ]
    };
  },
  async asyncData({ $axios, query, params, error }) {

    const response = await $axios.get(`/api/threats/`);
    const items = response.data;

    if ( items === undefined || items.length <= 0 ) {
      error({ statusCode: 404, message: 'Threat not found' });
    }

    const factionFilterSelections = [];
    if ( query['filter-faction'] ) {
      factionFilterSelections.push(query['filter-faction']);
    }

    let filterTier = 0;
    if ( query['filter-tier'] ) {
      filterTier = query['filter-tier'];
    }

    return {
      items: items,
      factionFilterSelections: factionFilterSelections,
      filterTier: filterTier,
    };
  },
  data() {
    return {
      searchQuery: '',
      settingFilter: [],
      contentFilter: [],
      factionFilterSelections: [],
      filterSourceModel: [],
      pagination: {
        sortBy: 'title',
        rowsPerPage: -1,
      },
      headers: [
        { text: 'Classification', align: 'center',  value: 'classification',  class: '' },
        //{ text: '',               align: 'center',  value: 'avatar',          class: '' },
        { text: 'Name',           align: 'start',   value: 'name',            class: '' },
        { text: 'Faction',        align: 'start',   value: 'faction',         class: '' },
        { text: 'Source',         align: 'start',   value: 'source.book',     class: '' },
        { text: '',               align: 'end',     value: 'actions',         class: '', sortable: false,  },
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
      //return this.homebrewRepository.map(h => h.setting).filter(i => i !== '');
    },
    filterFactionOptions() {
      let options = this.items.map( i => i.faction );
      return [...new Set(options)].sort();
    },
    filterSourceOptions() {
      let options = this.items.map(i => i.source.book);
      return [...new Set(options)].sort();
    },
    contentOptions() {
      let contentOptions = [];
      return [...new Set(contentOptions)].sort();
    },
    searchResults() {
      let filteredResults = this.items;

      if (this.filterSourceModel.length > 0) {
        filteredResults = filteredResults.filter( i => this.filterSourceModel.includes(i.source.book) );
      }

      if (this.factionFilterSelections.length > 0) {
        filteredResults = filteredResults.filter( i => this.factionFilterSelections.includes(i.faction) );
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
  methods: {
    getAvatar(factionLabel) {

      if ( factionLabel !== undefined ) {
        const slug = factionLabel.toLowerCase().replace(/\s/gm, '-');
        return `/img/bestiary/faction_${slug}_avatar.png`;
      }
      return `/img/icon/species/species_human_avatar.png`;
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
        this.factionFilterSelections = this.factionFilterSelections.filter(d => d != name);
      } else {
        this.factionFilterSelections.push(name);
      }
    },
    trackExpand(event) {
      if ( event.value === true ) {
        this.$ga.event('Bestiary Row', 'expand', this.computeSlug(event.item.key), 1);
      }
    },
    getClassificationColor(classification) {
      switch(classification) {
        case 'Troops': return 'green';
        case 'Elite': return 'yellow';
        case 'Adversary': return 'orange';
      }
    },
    computeSlug(key) {
      return key.replace(/([a-z][A-Z])/g, function (g) { return g[0] + '-' + g[1].toLowerCase() });
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
