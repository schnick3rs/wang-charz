<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <div>

    <v-row justify="center">

      <v-col v-bind:cols="12" class="elevation-4 mb-2 pa-0 ma-0">

        <v-breadcrumbs
          v-bind:items="breadcrumbItems"
          class="pa-2"
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

      <v-col v-bind:cols="12">
        <v-card>
          <v-card-text>
            <v-row justify="center">
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
                  filled
                  dense
                  v-model="contentFilter"
                  clearable
                  multiple
                  chips
                  deletable-chips
                  single-line
                  label="Filter by Content"
                  v-bind:items="contentOptions"
                >
                </v-select>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col v-bind:cols="12">
        <v-card>
          <v-data-table
            v-bind:headers="headers"
            v-bind:items="searchResults"
            v-bind:expanded.sync="expanded"
            v-bind:search="searchQuery"
            v-bind:items-per-page="-1"
            v-on:item-expanded="trackExpand"
            sort-by="title"
            item-key="title"
            show-expand
            hide-default-footer
          >

            <template v-slot:item.title="{ item }">
              <v-row no-gutters>
                <v-col v-bind:cols="12">{{item.title}}</v-col>
                <v-col v-bind:cols="12" class="caption grey--text" v-if="false">{{item.hint}}</v-col>
              </v-row>
            </template>

            <template v-slot:item.version="{ item }">
              <v-chip
                    v-if="['Draft'].includes(item.status)"
                    color="orange"
                    text-color="white"
                    tags
                    x-small
                    label
                  >
                    <span v-if="item.version">{{ item.version }}</span>
                    <span v-else>{{ item.status }}</span>
                  </v-chip>
                  <v-chip
                    v-if="['Released'].includes(item.status)"
                    color="green"
                    text-color="white"
                    tags
                    x-small
                    label
                  >
                    <span v-if="item.version">{{ item.version }}</span>
                    <span v-else>{{ item.status }}</span>
                  </v-chip>
            </template>

            <template v-slot:item.keywords="{ item }">
              <v-chip v-for="keyword in item.keywords" v-bind:key="keyword" small class="mr-2 mb-1 mt-1">{{ keyword }}</v-chip>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-btn small icon nuxt v-bind:to="`/vault/${item.slug}`">
                <v-icon>chevron_right</v-icon>
              </v-btn>
            </template>

            <template v-slot:expanded-item="{ headers, item }">
              <td v-bind:colspan="headers.length">

                <v-row>

                  <v-col v-bind:cols="12" >
                    <h3 class="headline">{{ item.title }}</h3>
                    <span class="grey--text">{{ item.subtitle }}</span>
                  </v-col>

                  <v-col v-bind:cols="12" v-bind:md="8">
                      <p><strong>Author:</strong> {{ item.author }}</p>
                      <p>{{ item.abstract }}</p>
                       <p v-if="item.keywords">
                         <span>Keywords: </span>
                         <v-chip
                           v-for="keyword in item.keywords"
                           v-bind:key="keyword"
                           class="mr-2 mb-1 mt-1"
                           small
                           label
                         >
                           {{ keyword }}
                         </v-chip>
                      </p>
                  </v-col>

                  <v-col v-bind:cols="12" v-bind:md="3" v-if="item.thumbnail && false">
                    <v-img v-bind:src="item.thumbnail" />
                  </v-col>

                  <v-col v-bind:cols="12" v-bind:md="4">
                      <strong>Topics:</strong>
                      <ul>
                        <li v-for="parts in item.topics" v-bind:key="parts">
                          <nuxt-link
                            v-if="['Archetypes','Ascension Packages','Species'].includes(parts)"
                            v-bind:to="`/library/${stringToKebab(parts)}?filter-source=${item.key}`"
                          >
                            {{ parts }}
                          </nuxt-link>
                          <nuxt-link
                            v-else-if="['Threats'].includes(parts)"
                            v-bind:to="`/bestiary?filter-source=${item.key}`"
                          >
                            {{ parts }}
                          </nuxt-link>
                          <span v-else>{{ parts }}</span>
                        </li>
                      </ul>
                  </v-col>

                </v-row>

                <v-card-actions>
                  <v-btn color="primary" v-bind:href="item.url" target="_blank" v-on:click="trackEvent(item.url)">View the document <v-icon right dark>launch</v-icon></v-btn>
                  <v-btn color="green" nuxt v-bind:to="'/vault/'+item.slug">Show Details</v-btn>
                </v-card-actions>

              </td>
            </template>

          </v-data-table>

        </v-card>
      </v-col>

      <v-col v-bind:cols="12">

        <v-card>
          <v-card-text>
            <h1 class="headline">Search the Vault for precious, fan-made homebrews</h1>
            <p>
              In desperate need of an option to extend your Wrath & Glory Campaign?
              Searching for <em>that</em> particular homebrew to improve your setting?
              The <strong>Vault</strong> has you covered.
              This is a <strong>curated list of homebrews</strong> from fans, found in the internet.
              I credit the author and link to their community pages, as good as I could,
                if I find them either in the document found or on their respective page.
              If want to add, remove or change your homebrew content or if you want to propose changes regarding links,
                you can mail me to <a href="mailto:docsofdoom+vault@gmail.com?subject=Vault Request">docsofdoom+vault(at)gmail.com</a>.
             </p>
          </v-card-text>
        </v-card>

      </v-col>
    </v-row>

  </div>

</template>

<script>
import SchemaDigitalDocument from '~/assets/SchemaDigitalDocument.json';
import SchemaFaqPage from '~/assets/SchemaFaqPage.json';

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

    const faqPageSchama = {
      ...SchemaFaqPage,
    };

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

    const title = 'Collection of Wrath & Glory Homebrews | Vault';
    const description = 'The Doctors of Doom Vault contains a curated collection of supplements,' +
      ' homebrews and houserules for Wrath & Glory, the latest Warhammer 40k Roleplaying game. ' +
      'Those are written by dedicated fans.';
    const image = 'https://www.doctors-of-doom.com/img/artwork_vault_bright.jpg';

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
        { innerHTML: JSON.stringify(itemSchemaArray), type: 'application/ld+json' },
        { innerHTML: JSON.stringify(faqPageSchama), type: 'application/ld+json' },
        { innerHTML: JSON.stringify(breadcrumbListSchema), type: 'application/ld+json' },
      ]
    };
  },
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
          text: 'Title', align: 'start', value: 'title', class: '',
        },
        {
          text: 'Version', align: 'start', value: 'version', class: '',
        },
        {
          text: 'Hint', align: 'start', value: 'hint', class: '',
        },
        {
          text: 'Author', align: 'start', value: 'author', class: '',
        },
        {
          text: '', sortable: false, align: 'end', value: 'actions', class: '',
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
          text: 'Vault', nuxt: true, exact: true, to: '/vault',
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
    stringToKebab(text) {
      return text.toLowerCase().replace(/\W/gm, '-');
    },
    trackExpand(event) {
      if ( event.value === true ) {
        this.$ga.event('Vault Row', 'expand', event.item.title, 1);
      }
    },
    trackEvent(url) {
      this.$ga.event('Outbound Link', 'click', url, 10);
    },
  },
};
</script>

<style scoped lang="css">
  tr:hover {
    cursor: pointer;
  }
</style>
