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
          item-key="name"
          :pagination.sync="pagination"
          :expand="expand"
          :search="searchQuery"
          hide-actions
        >
          <template v-slot:headers="props">
            <tr>
              <th
                v-for="header in props.headers"
                :key="header.text"
                :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '', header.class]"
                @click="changeSort(header.value)"
              >
                <v-icon small>arrow_upward</v-icon>
                {{ header.text }}
              </th>
            </tr>
          </template>
          <template v-slot:items="props">
            <tr @click="props.expanded = !props.expanded">
              <td>{{ props.item.name }}
                <v-chip
                  v-if="props.item.version === 'draft'"
                  color="orange"
                  text-color="white"
                  tags
                  small
                  label
                >
                  {{ props.item.version }}
                </v-chip>
                <v-chip
                  v-else-if="props.item.version !== undefined && props.item.version.indexOf('v0') >= 0"
                  color="orange"
                  text-color="white"
                  tags
                  small
                  label
                >
                  {{ props.item.version }}
                </v-chip>
              </td>
              <td class="hidden-xs-only">{{ props.item.hint }}</td>
              <td>
                <v-chip v-for="keyword in props.item.keywords" :key="keyword" small>{{ keyword }}</v-chip>
              </td>
              <td class="hidden-sm-and-down">
                <span>{{ props.item.author }}</span>
              </td>
              <td class="text-lg-center hidden-xs-only">
                <v-icon v-if="!props.expanded">expand_more</v-icon>
                <v-icon v-else-if="props.expanded">expand_less</v-icon>
              </td>
            </tr>
          </template>

          <template v-slot:expand="props">
            <v-card>
              <v-card-title>
                <h3 class="headline">{{ props.item.name }}</h3>
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
                <v-flex xs12 sm6>
                  <v-card-text>
                    <strong>Topics:</strong>
                    <ul>
                      <li v-for="parts in props.item.topics">
                        {{ parts }}
                      </li>
                    </ul>
                  </v-card-text>
                </v-flex>
              </v-layout>

              <v-card-actions>
                <v-btn color="primary" :href="props.item.url" target="_blank">View the document <v-icon right dark>launch</v-icon></v-btn>
                <v-btn color="green" nuxt :to="'/vault/'+slugBy(props.item.name)">Show Details</v-btn>
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
  import HomebrewRepositoryMixin from '~/mixins/HomebrewRepositoryMixin'

  export default {
  components: {},
  head: function () {
    return {
      title: 'Collection of Wrath & Glory Homebrews | Vault',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'The Doctors of Doom Vault contains a curated collection of homebrews and houserules for Wrath & Glory,' +
            ' the latest Warhammer 40k Roleplaying game. Those are written by dedicated fans.'
        }
      ]
    }
  },
  layout: 'vault',
  mixins: [ HomebrewRepositoryMixin ],
  data() {
    return {
      searchQuery: '',
      settingFilter: [],
      contentFilter: [],
      pagination: {
        sortBy: 'name',
        rowsPerPage: -1,
      },
      headers: [
        { text: 'Name', align: 'left', value: 'name', class: '' },
        { text: 'Hint', align: 'left', value: 'hint', class: 'hidden-xs-only' },
        { text: 'Keywords', align: 'left', value: 'keywords', class: '' },
        { text: 'Author', align: 'left', value: 'author', class: 'hidden-sm-and-down' },
        { text: '', sortable: false, align: 'right', value: 'actions', class: 'hidden-xs-only' }
      ],
      expand: false
    }
  },
  computed: {
    breadcrumbItems() {
      return [
        {text: 'D', disabled: false, nuxt: true, exact: true, to: '/',},
        {text: 'Vault', disabled: false, nuxt: true, exact: true, to: '/vault'},
      ];
    },
    settingOptions() {
      return this.homebrewRepository.map(h => h.setting).filter(i => i !== '')
    },
    contentOptions() {
      let contentOptions = []
      this.homebrewRepository.forEach(h => contentOptions = [ ...contentOptions, ...h.topics, ...h.keywords])
      return [ ...new Set(contentOptions)].sort()
    },
    searchResults() {
      let filteredResults = this.homebrewRepository

      if (this.searchQuery) {
        //filteredResults = filteredResults.filter(h => (h.name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) >= 0))
      }

      if (this.contentFilter.length > 0) {
        filteredResults = filteredResults.filter(h => [...h.topics, ...h.keywords]
          .some(c => this.contentFilter.includes(c)))
      }

      return filteredResults
    },
    pages() {
      if (this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      ) return 0

      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    }
  },
  methods: {
    slugBy(name) {
      return name.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-');
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    },
  }
}
</script>

<style scoped lang="css">
  tr:hover {
    cursor: pointer;
  }
</style>
