<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

<div>

  <v-row justify="center">
    <v-col v-bind:cols="11" class="elevation-4 mb-2 pa-0 ma-0">

      <v-breadcrumbs
        v-bind:items="breadcrumbItems"
      >
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item
            v-bind:nuxt="true"
            v-bind:to="item.to"
            v-bind:disabled="item.disabled"
            v-bind:exact="item.exact"
          >
            <img v-if="item.to == '/'" src="/favicon-16x16.png" />
            {{ item.text }}
          </v-breadcrumbs-item>
        </template>

        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>

      </v-breadcrumbs>

    </v-col>
  </v-row>

  <v-row justify="center">

    <v-col v-bind:cols="11">
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
                label="Filter by Content"
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
          </template>

          <template v-if="false" v-slot:item.keywords="{ item }">
            <v-chip-group multiple>
              <v-chip v-for="keyword in item.keywords" v-bind:key="keyword" x-small label class="mr-2 mb-1 mt-1">{{ keyword }}</v-chip>
            </v-chip-group>
          </template>

          <template v-slot:expanded-item="{ headers, item }">
            <td v-bind:colspan="headers.length">

              <v-row justify="center">

                <v-col v-bind:cols="12" v-bind:md="12">
                  <h3 class="headline">{{ item.name }}</h3>
                </v-col>

                <!-- Stats -->
                <v-col v-bind:cols="12" v-bind:md="3">

                  <v-simple-table dense>

                    <template v-slot:default>

                      <thead>
                      <tr>
                        <th>Name</th>
                        <th>Rating</th>
                      </tr>
                      </thead>

                      <tbody>

                      <tr
                        v-for="(value, key) in item.attributes"
                        v-bind:key="key"
                      >
                        <td>{{ getAttributeByKey(key).name }}</td>
                        <td>{{ value }}</td>
                      </tr>

                      </tbody>

                    </template>

                  </v-simple-table>

                </v-col>

                <v-col v-bind:cols="12" v-bind:md="5">

                  <v-simple-table dense>

                    <template v-slot:default>

                      <thead>
                      <tr>
                        <th>Name</th>
                        <th>Rating</th>
                      </tr>
                      </thead>

                      <tbody>

                      <tr
                        v-for="(value, key) in item.traits"
                        v-bind:key="key"
                      >
                        <td>{{ getTraitByKey(key).name }}</td>
                        <td v-if="key==='resilience'">{{ value.total }} ( {{ value.armourRating }} {{ value.armourName }})</td>
                        <td v-else>{{ value }}</td>
                      </tr>

                      </tbody>

                    </template>

                  </v-simple-table>

                </v-col>
                <v-col v-bind:cols="12" v-bind:md="3">

                  <v-simple-table dense>

                    <template v-slot:default>

                      <thead>
                      <tr>
                        <th>Name</th>
                        <th>Rating</th>
                      </tr>
                      </thead>

                      <tbody>

                      <tr
                        v-for="(value, key) in item.skills"
                        v-bind:key="key"
                      >
                        <td v-if="key==='default'">Default</td>
                        <td v-else>{{ getSkillByKey(key).name }}</td>
                        <td>{{ value }}</td>
                      </tr>

                      </tbody>

                    </template>

                  </v-simple-table>

                </v-col>

                <!-- Attacks -->
                <v-col v-bind:cols="12" v-bind:md="11">

                  <h4 class="title-1">Attacks</h4>

                  <div>
                    <p v-html="item.attackOptions"></p>
                  </div>

                  <div>

                    <v-simple-table dense>

                      <template v-slot:default>

                        <thead>
                          <tr>
                            <th
                              v-for="header in attacksTable.headers"
                              v-bind:key="header.value"
                              class="text-left"
                            >
                              {{ header.text }}
                            </th>
                          </tr>
                        </thead>

                        <tbody>

                          <tr
                            v-for="attack in item.attacks"
                            v-bind:key="item.label"
                          >
                            <td class="text-left">{{ attack.name }}</td>
                            <td class="text-center">
                              <span v-if="attack.range === 1">melee</span>
                              <span v-else>{{ attack.range }} m</span>
                            </td>
                            <td class="text-center">
                              <div v-if="attack.damage">
                                <span v-if="item.type==='Melee Weapon'">{{ attack.damage.static }}*</span>
                                <span v-else>{{ attack.damage.static }}</span>
                                <span> + </span>
                                <span>{{ attack.damage.ed }} ED</span>
                              </div>
                            </td>
                            <td class="text-center">
                              <span>{{ attack.ap }}</span>
                            </td>
                            <td class="text-center">
                              <span>{{ attack.salvo }}</span>
                            </td>
                            <td class="text-left">
                              <span v-if="attack.traits && attack.traits.length >0">{{ attack.traits.join(', ') }}</span>
                            </td>
                          </tr>

                        </tbody>

                      </template>
                    </v-simple-table>

                  </div>

                  <div v-if="item.weaponTraits" v-for="weaponTrait in item.weaponTraits" class="pt-2">
                    <p><strong>{{ weaponTrait.name }}:</strong> {{ weaponTrait.effect }}</p>
                  </div>

                </v-col>

                <!-- Abilities -->
                <v-col v-bind:cols="12" v-bind:md="11">

                  <h4>Special Abilities</h4>

                  <div v-for="ability in item.specialAbilities">
                    <p><strong>{{ ability.name }}:</strong> {{ ability.effect }}</p>
                  </div>

                </v-col>

                <v-col v-bind:cols="12" v-bind:md="12">
                  {{ item.description }}
                </v-col>

                <!-- Keywords -->
                <v-col v-bind:cols="12">
                  <span>Keywords: </span>
                  <v-chip v-for="keyword in item.keywords" v-bind:key="keyword" small label class="mr-2 mb-1 mt-1">{{ keyword }}</v-chip>
                </v-col>

              </v-row>

            </td>
          </template>

        </v-data-table>

      </v-card>
    </v-col>

    <v-col v-bind:cols="11">

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
import StatRepository from '~/mixins/StatRepositoryMixin';
import ThreatRepository from '~/mixins/ThreatRepositoryMixin';

export default {
  components: {},
  mixins: [ StatRepository, ThreatRepository ],
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
    const description = 'The Bestiary contains many homebrew threats to be used by the Game Master to ' +
      'challenge your Wrath & Glory Players.';
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
  async asyncData({ app }) {
  },
  data() {
    return {
      searchQuery: '',
      settingFilter: [],
      contentFilter: [],
      factionFilterSelections: [],
      filterSourceModel: [],
      filterTier: 0,
      pagination: {
        sortBy: 'title',
        rowsPerPage: -1,
      },
      headers: [
        {
          text: 'Classification', align: 'center', value: 'classification', class: '',
        },
        {
          text: 'Name', align: 'left', value: 'name', class: '',
        },
        {
          text: 'Faction', align: 'left', value: 'faction', class: '',
        },
        {
          text: 'Source', align: 'left', value: 'source.book', class: '',
        },
        {
          text: '', sortable: false, align: 'right', value: 'actions', class: '',
        },
      ],
      expanded: [],
      attacksTable: {
        headers: [
          { text: 'Name', value: 'name' },
          { text: 'Range', value: 'range' },
          { text: 'Damage', value: 'damage' },
          { text: 'AP', value: 'ap' },
          { text: 'Salvo', value: 'salvo' },
          { text: 'Traits', value: 'traits' },
        ],
      }
    };
  },
  computed: {
    items() {
      return this.threatRepository;
    },
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
        this.$ga.event('Bestiary Row', 'expand', event.item.name, 1);
      }
    },
    getClassificationColor(classification) {
      switch(classification) {
        case 'Troops': return 'green'
        case 'Elite': return 'yellow'
        case 'Adversary': return 'orange'
      }
    }
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
