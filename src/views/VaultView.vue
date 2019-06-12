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
                <td>
                  <!--<v-icon outlined>home</v-icon> for homebrew drafts -->
                  <!--<v-icon home></v-icon> for homebrew released -->
                  <!--<v-icon >public</v-icon> for official -->
                  {{props.item.name}}
                  <v-chip v-if="props.item.version === 'draft'" color="orange" text-color="white" tags small label>{{props.item.version}}</v-chip>
                  <v-chip v-else-if="props.item.version !== undefined && props.item.version.indexOf('v0') >= 0" color="orange" text-color="white" tags small label>{{props.item.version}}</v-chip>
                </td>
                <td>
                  <span>{{props.item.author}}</span>
                  <span v-for="link in props.item.links">
                    <v-btn small v-if="link.icon" icon target="_blank" :href="link.url"><v-icon small color="blue">{{link.icon}}</v-icon></v-btn>
                    <a class="mr-2" v-else :href="link.url" target="_blank">{{link.name}}</a>
                  </span>
                </td>
                <td>{{props.item.setting}}</td>
                <td>{{props.item.hint}}</td>
                <td class="text-lg-center">
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
                  <span class="grey--text">{{ props.item.subtitle }}</span>
                </v-card-title>

                <v-layout>
                  <v-flex xs12 md6>
                    <v-card-text>
                      <p><strong>Related Setting:</strong> {{ props.item.setting }}</p>
                      <p><strong>Author:</strong> {{ props.item.author }}</p>
                      <p>{{ props.item.abstract }}</p>
                    </v-card-text>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-card-text>
                      <strong>Contains:</strong>
                      <ul>
                        <li v-for="parts in  props.item.contains">{{ parts }}</li>
                      </ul>
                      <p v-if="props.item.tags"><v-chip v-for="tag in  props.item.tags">{{ tag }}</v-chip></p>
                    </v-card-text>
                  </v-flex>

                </v-layout>


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
        pagination: { rowsPerPage: -1},
        headers: [
          { text: 'Name', align: 'left', value: 'name' },
          { text: 'Author', align: 'left', value: 'author' },
          { text: 'Setting', align: 'left', value: 'setting' },
          { text: 'Hint', align: 'left', value: 'hint' },
          { text: 'Actions', align: 'center', value: 'actions' },
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
        let contentOptions = [];
        this.homebrewRepository.forEach( h => contentOptions = [ ...contentOptions, ...h.contains] );
        return [ ...new Set(contentOptions)];
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
          filteredResults = filteredResults.filter( h => h.contains.some( c => this.contentFilter.includes(c) ) );
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
