<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <div>
    <div class="elevation-4 mb-4 p-0">
      <ul class="v-breadcrumbs theme--light">
        <li class="v-breadcrumbs__item">
          <nuxt-link to="/" class="v-breadcrumbs__item"><img src="/favicon-16x16.png" /></nuxt-link>
        </li>
        <li class="v-breadcrumbs__divider">/</li>
        <li class="v-breadcrumbs__item">
          <nuxt-link to="/vault" class="v-breadcrumbs__item--disabled v-breadcrumbs__item">Vault</nuxt-link>
        </li>
      </ul>
    </div>

  <v-layout justify-center row wrap>

    <v-flex xs12>
      <v-card>
        <v-card-text>
          <v-layout justify-center row wrap>
            <v-flex xs12 sm6>
              <v-text-field
                v-model="searchQuery"
                box
                dense
                clearable
                label="Search"></v-text-field>
            </v-flex>

            <v-flex xs12 sm6>
              <v-select
                box
                dense
                v-model="contentFilter"
                clearable
                multiple
                chips
                deletable-chips
                single-line
                label="Filter by Content"
                :items="contentOptions"></v-select>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>

    <v-flex xs12>
      <v-card>
        <v-data-table
          :headers="headers"
          :items="searchResults"
          disable-initial-sort
          item-key="title"
          :pagination.sync="pagination"
          :expand="expand"
          :search="searchQuery"
          hide-actions
        >
          <template v-slot:headers="props">
            <tr>
              <th
                v-for="header in props.headers"
                v-bind:key="header.value"
                v-bind:class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '', header.class]"
                v-on:click="changeSort(header.value)"
              >
                <v-icon small>arrow_upward</v-icon>
                {{ header.text }}
              </th>
            </tr>
          </template>
          <template v-slot:items="props">
            <tr @click="toggle(props)">
              <td>
                {{ props.item.title }}
                <br/><span class="grey--text hidden-sm-and-up">{{props.item.hint}}</span>
              </td>
              <td>
                <v-chip
                  v-if="['Draft'].includes(props.item.status)"
                  color="orange"
                  text-color="white"
                  tags
                  small
                  label
                >
                  <span v-if="props.item.version">{{ props.item.version }}</span>
                  <span v-else>{{ props.item.status }}</span>
                </v-chip>
                <v-chip
                  v-if="['Released'].includes(props.item.status)"
                  color="green"
                  text-color="white"
                  tags
                  small
                  label
                >
                  <span v-if="props.item.version">{{ props.item.version }}</span>
                  <span v-else>{{ props.item.status }}</span>
                </v-chip>
              </td>
              <td class="hidden-xs-only">{{ props.item.hint }}</td>
              <td class="hidden-sm-and-down">
                <v-chip v-for="keyword in props.item.keywords" :key="keyword" small>{{ keyword }}</v-chip>
              </td>
              <td class="hidden-sm-and-down">
                <span>{{ props.item.author }}</span>
              </td>
              <td class="text-lg-center hidden-xs-only">
                <v-icon v-if="!props.expanded">expand_more</v-icon>
                <v-icon v-else-if="props.expanded">expand_less</v-icon>
              </td>
              <td>
                <v-btn small icon nuxt :to="'/vault/'+props.item.slug">
                  <v-icon>chevron_right</v-icon>
                </v-btn>
              </td>
            </tr>
          </template>

          <template v-slot:expand="props">

            <v-card>

              <v-card-title>
                <h3 class="headline">{{ props.item.title }}</h3>
                <span class="grey--text">{{ props.item.subtitle }}</span>
              </v-card-title>

              <v-layout row wrap>

                <v-flex xs12 sm6>
                  <v-card-text>
                    <p><strong>Author:</strong> {{ props.item.author }}</p>
                    <p>{{ props.item.abstract }}</p>
                     <p v-if="props.item.keywords">
                      <v-chip v-for="keyword in props.item.keywords" :key="keyword">
                        {{ keyword }}
                      </v-chip>
                    </p>
                  </v-card-text>
                </v-flex>

                <v-flex xs12 sm3 v-if="props.item.thumbnail" class="hidden-xs-only">
                  <v-img v-bind:src="props.item.thumbnail" />
                </v-flex>

                <v-flex xs12 sm3>
                  <v-card-text>
                    <strong>Topics:</strong>
                    <ul>
                      <li v-for="parts in props.item.topics" v-bind:key="parts">
                        {{ parts }}
                      </li>
                    </ul>
                  </v-card-text>
                </v-flex>

              </v-layout>

              <v-card-actions>
                <v-btn color="primary" :href="props.item.url" target="_blank" @click="trackEvent(props.item.url)">View the document <v-icon right dark>launch</v-icon></v-btn>
                <v-btn color="green" nuxt :to="'/vault/'+props.item.slug">Show Details</v-btn>
              </v-card-actions>

            </v-card>

          </template>

        </v-data-table>

        <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :length="pages" />
        </div>
      </v-card>
    </v-flex>

    <v-flex xs12>

      <v-card>
        <v-card-text>
          <h1>Search the Vault for precious, fanmade hombrews</h1>
          <p>
            This is a curated list of homebrews from fans, found in the internet. I credit the author and link to their
            community pages, as good as I could, if I find them either in the document found or on their respective page.
            If want to add, remove or change your homebrew content or if you want to propose changes regarding links,
            you can mail me to <a href="mailto:docsofdoom+vault@gmail.com?subject=Vault Request">docsofdoom+vault(at)gmail.com</a>.
           </p>
        </v-card-text>
      </v-card>

    </v-flex>
  </v-layout>
  </div>


</template>

<script>
  import SchemaDigitalDocument from '~/assets/SchemaDigitalDocument.json';

  export default {
  components: {},
  head() {

    const itemSchemaArray = this.vaultItems.map( item => {
      return {
        ...SchemaDigitalDocument,
        name: item.title,
        alternativeHeadline: item.subtitle,
        author: item.author,
        version: item.version || item.status,
        url: item.url,
        thumbnailUrl: item.thumbnail ? `https://www.doctors-of-doom.com${item.thumbnail}` : null,
        description: item.abstract,
        keywords: [...item.keywords, 'Wrath & Glory'].join(','),
      };
    });


    return {
      title: 'Collection of Wrath & Glory Homebrews | Vault',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'The Doctors of Doom Vault contains a curated collection of homebrews and houserules for Wrath & Glory,'
            + ' the latest Warhammer 40k Roleplaying game. Those are written by dedicated fans.',
        },
      ],
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        { innerHTML: JSON.stringify(itemSchemaArray), type: 'application/ld+json' }
      ]
    };
  },
  layout: 'vault',
  async asyncData({ app }) {
    const vaultItemResponse = await app.$axios.get(`/api/homebrews/`);
    return {
      vaultItems: vaultItemResponse.data,
    };
  },
  data() {
    return {
      searchQuery: '',
      settingFilter: [],
      contentFilter: [],
      pagination: {
        sortBy: 'title',
        rowsPerPage: -1,
      },
      headers: [
        {
          text: 'Title', align: 'left', value: 'title', class: '',
        },
        {
          text: 'Version', align: 'left', value: 'version', class: '',
        },
        {
          text: 'Hint', align: 'left', value: 'hint', class: 'hidden-xs-only',
        },
        {
          text: 'Keywords', align: 'left', value: 'keywords', class: 'hidden-sm-and-down',
        },
        {
          text: 'Author', align: 'left', value: 'author', class: 'hidden-sm-and-down',
        },
        {
          text: '', sortable: false, align: 'right', value: 'details', class: 'hidden-xs-only',
        },
        {
          text: '', sortable: false, align: 'right', value: 'actions', class: '',
        },
      ],
      expand: false,
    };
  },
  computed: {
    breadcrumbItems() {
      return [
        {
          text: 'D', disabled: false, nuxt: true, exact: true, to: '/',
        },
        {
          text: 'Vault', disabled: false, nuxt: true, exact: true, to: '/vault',
        },
      ];
    },
    settingOptions() {
      return null;
      //return this.homebrewRepository.map(h => h.setting).filter(i => i !== '');
    },
    contentOptions() {
      let contentOptions = [];
      this.vaultItems.forEach( vaultItem => {
        contentOptions = [...contentOptions, ...vaultItem.topics, ...vaultItem.keywords];
      });
      return [...new Set(contentOptions)].sort();
    },
    searchResults() {
      let filteredResults = this.vaultItems;

      if (this.searchQuery) {
        // filteredResults = filteredResults.filter(h => (h.title.toLowerCase().indexOf(this.searchQuery.toLowerCase()) >= 0))
      }

      if (this.contentFilter.length > 0) {
        filteredResults = filteredResults.filter(h => [...h.topics, ...h.keywords]
          .some(c => this.contentFilter.includes(c)));
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
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    },
    toggle(props) {
      this.$ga.event('Vault Row', 'expand', props.item.title, 0);
      props.expanded = !props.expanded;
    },
    trackEvent(url) {
      this.$ga.event('Outbound Link', 'click', url, 0);
    },
  },
};
</script>

<style scoped lang="css">
  tr:hover {
    cursor: pointer;
  }
</style>
