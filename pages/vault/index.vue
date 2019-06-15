<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-layout justify-center row wrap>
    <v-flex xs12>
      <v-card>
        <v-card-text>
          <v-layout justify-center row wrap>
            <v-flex xs12 sm4>
              <v-text-field
                v-model="searchQuery"
                box
                dense
                clearable
                label="Search"></v-text-field>
            </v-flex>

            <v-flex xs12 sm4>
              <v-select
                box
                dense
                v-model="settingFilter"
                clearable
                multiple
                chips
                deletable-chips
                single-line
                label="Filter by Setting"
                :items="settingOptions"></v-select>
            </v-flex>

            <v-flex xs12 sm4>
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
          hide-actions
        >
          <template v-slot:headers="props">
            <tr>
              <th
                v-for="header in props.headers"
                :key="header.text"
                :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '', header.class]"

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
              <td class="hidden-sm-and-down">
                <span>{{ props.item.author }}</span>
                <span v-for="link in props.item.links" :key="link.name">
                  <v-btn v-if="link.icon" small icon target="_blank" :href="link.url"><v-icon small color="blue">{{ link.icon }}</v-icon></v-btn>
                  <a v-else class="mr-2" :href="link.url" target="_blank">{{ link.name }}</a>
                </span>
              </td>
              <td>{{ props.item.setting }}</td>
              <td class="hidden-xs-only">{{ props.item.hint }}</td>
              <td class="text-lg-center hidden-xs-only">
                <v-btn icon :href="props.item.url" target="_blank">
                  <v-icon color="blue">
                    launch
                  </v-icon>
                </v-btn>
              </td>
            </tr>
          </template>

          <template v-slot:expand="props">
            <v-card>
              <v-card-title>
                <h2 class="headline">
                  {{ props.item.name }}
                </h2>
                <span class="grey--text">{{ props.item.subtitle }}</span>
              </v-card-title>

              <v-layout row wrap>
                <v-flex xs12 sm6>
                  <v-card-text>
                    <p><strong>Related Setting:</strong> {{ props.item.setting }}</p>
                    <p><strong>Author:</strong> {{ props.item.author }}</p>
                    <p>{{ props.item.abstract }}</p>
                  </v-card-text>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-card-text>
                    <strong>Contains:</strong>
                    <ul>
                      <li v-for="parts in props.item.contains">
                        {{ parts }}
                      </li>
                    </ul>
                    <p v-if="props.item.tags">
                      <v-chip v-for="tag in props.item.tags" :key="tag">
                        {{ tag }}
                      </v-chip>
                    </p>
                  </v-card-text>
                </v-flex>
              </v-layout>

              <v-card-actions>
                <v-btn color="primary" :href="props.item.url">
                  Visit the document
                </v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-data-table>

        <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :length="pages" />
        </div>
      </v-card>
    </v-flex>

    <v-flex xs12 v-if="false">

      <v-card>
        <v-card-text>
          <h1>Search the Vault for precious, fanmade hombrews</h1>
          <p>Greeting</p>
          <h2></h2>
        </v-card-text>
      </v-card>

    </v-flex>
  </v-layout>
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
          content: 'The Doctors of Doom Vault contains a collection of homebrews and houserules Wrath & Glory, the ' +
            'latest Warhammer 40k Roleplaying game. Those are written by dedicated fans.'
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
      pagination: { rowsPerPage: -1 },
      headers: [
        { text: 'Name', align: 'left', value: 'name', class: '' },
        { text: 'Author', align: 'left', value: 'author', class: 'hidden-sm-and-down' },
        { text: 'Setting', align: 'left', value: 'setting', class: '' },
        { text: 'Hint', align: 'left', value: 'hint', class: 'hidden-xs-only' },
        { text: 'Actions', align: 'center', value: 'actions', class: 'hidden-xs-only' }
      ],
      expand: false
    }
  },
  computed: {
    settingOptions() {
      return this.homebrewRepository.map(h => h.setting).filter(i => i !== '')
    },
    contentOptions() {
      let contentOptions = []
      this.homebrewRepository.forEach(h => contentOptions = [ ...contentOptions, ...h.contains])
      return [ ...new Set(contentOptions)]
    },
    searchResults() {
      let filteredResults = this.homebrewRepository

      if (this.searchQuery) {
        filteredResults = filteredResults.filter(h => (h.name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) >= 0))
      }

      if (this.settingFilter.length > 0) {
        filteredResults = filteredResults.filter(h => this.settingFilter.includes(h.setting))
      }

      if (this.contentFilter.length > 0) {
        filteredResults = filteredResults.filter(h => h.contains.some(c => this.contentFilter.includes(c)))
      }

      return filteredResults
    },
    searchResultsForTable() {
      return this.searchResults.map((r) => {
        return {
          name: r.name,
          hint: r.hint,
          author: r.author,
          setting: r.setting
        }
      })
    },
    changeSort (column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    },
    pages() {
      if (this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      ) return 0

      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    }
  }
}
</script>
