<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <section class="library">

    <v-container grid-list-md>

      <v-layout justify-center row wrap>

        <v-flex xs12>

          <v-card>

            <v-card-text>

              <v-layout justify-center row wrap>

                <v-flex xs12 sm4>
                  <v-text-field box dense clearable
                    label="Search"
                    v-model="searchQuery"
                  >
                  </v-text-field>
                </v-flex>

                <v-flex xs12 sm4>
                  <v-select box dense clearable multiple chips deletable-chips single-line
                    label="Filter by Setting"
                    :items="settingOptions"
                    v-model="settingFilter"
                  >
                  </v-select>
                </v-flex>

                <v-flex xs12 sm4>
                  <v-select box dense clearable multiple chips deletable-chips single-line
                    label="Filter by Content"
                    :items="contentOptions"
                    v-model="contentFilter"
                  >
                  </v-select>
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
                  item-key="name"
                  :pagination.sync="pagination"
                  :expand="expand"
                  hide-actions
          >

            <template v-slot:items="props">
              <tr @click="props.expanded = !props.expanded" >
                <td>{{props.item.name}}</td>
                <td>{{props.item.hint}}</td>
                <td>{{props.item.author}}</td>
                <td>
                  <v-btn icon :href="props.item.url" target="_blank">
                    <v-icon color="blue">launch</v-icon>
                  </v-btn>
                </td>
              </tr>
            </template>

            <template v-slot:expand="props">
              <v-card>

                <v-card-title>
                  <h2 class="headline">{{ props.item.name }}</h2>
                  <span class="grey--text">{{ props.item.hint }}</span>
                </v-card-title>

                <v-card-text>
                  <p><strong>Author:</strong> {{ props.item.author }}</p>
                  <p>{{ props.item.abstract }}</p>
                  <strong>Contains:</strong>
                  <ul>
                    <li v-for="parts in  props.item.contains">{{ parts }}</li>
                  </ul>
                </v-card-text>

                <v-card-text>

                  <p><strong>Related Setting:</strong> {{ props.item.setting }}</p>
                  <p><v-chip v-for="tag in  props.item.tags">{{ tag }}</v-chip></p>
                </v-card-text>

                <v-card-actions>
                  <v-btn color="primary" :href="props.item.url">Visit the document</v-btn>
                </v-card-actions>

              </v-card>
            </template>

          </v-data-table>

          <div class="text-xs-center pt-2">
            <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
          </div>

          </v-card>

        </v-flex>

      </v-layout>

    </v-container>

  </section>

</template>

<script lang="js">
  import HomebrewRepository from '../mixins/HomebrewRepositoryMixin';

  export default  {
    name: 'library',
    mixins: [ HomebrewRepository ],
    props: [],
    mounted() {

    },
    data() {
      return {
        searchQuery: '',
        settingFilter: [],
        contentFilter: [],
        pagination: {},
        headers: [
          { text: 'Name', align: 'left', value: 'name' },
          { text: 'Hint', align: 'left', value: 'Hint' },
          { text: 'Author', align: 'center', value: 'author' },
          { text: 'Actions', align: 'center', value: 'author' },
        ],
        expand: false,
      }
    },
    methods: {

    },
    computed: {
      settingOptions() {
        return this.homebrewRepository.map( h => h.setting ).filter( i => i !== '');
      },
      contentOptions() {
        return this.homebrewRepository.map( h => h.contains );
      },
      searchResults() {
        let filteredResults = this.homebrewRepository;

        if ( this.searchQuery ) {
          filteredResults = filteredResults.filter( h => (h.name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) >= 0) );
        }

        if ( this.settingFilter.length > 0 ) {
          filteredResults = filteredResults.filter( h => this.settingFilter.includes(h.setting) );
        }

        if ( this.contentFilter.length > 0 ) {
          filteredResults = filteredResults.filter( h => this.contentFilter.includes(h.contains) );
        }

        return filteredResults;
      },
      searchResultsForTable() {
        return this.searchResults.map( r => {
          return {
            name: r.name,
            hint: r.hint,
            author: r.author,
            setting: r.setting,
          };
        });
      },
      pages () {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      },
    }
  }
</script>

<style scoped lang="css">
  .library {

  }
</style>
