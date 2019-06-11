<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <section class="library">

    <v-container grid-list-md>

      <v-layout justify-center row wrap>

        <v-flex xs12 sm10>

          <v-card>
            <v-card-title>Hombrew Vault</v-card-title>

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

        <v-flex xs12 sm12 lg12 xl10>

          <v-layout text-xs-center>

            <v-flex xs10 sm5 md5 lg5><strong>Name</strong></v-flex>

            <v-flex xs3 sm3 md3 lg3 class="hidden-xs-only"><strong>Setting</strong></v-flex>

            <v-flex xs3 sm3 md3 lg3 class="hidden-xs-only"><strong>Author</strong></v-flex>

            <v-flex xs1 sm1 md1 lg1><strong>Actions</strong></v-flex>

          </v-layout>

        </v-flex>

        <v-flex xs12 sm12 lg12 xl10>

          <v-card v-for="item in searchResults" :key="item.name">

              <v-layout align-center>

                <v-flex xs10 sm5 md5 lg5><v-card-title><div class="subheading">{{item.name}}</div></v-card-title></v-flex>

                <v-flex xs3 sm3 md3 lg3 class="hidden-xs-only"><v-card-title>{{item.setting}}</v-card-title></v-flex>

                <v-flex xs3 sm3 md3 lg3 class="hidden-xs-only"><v-card-title>{{item.author}}</v-card-title></v-flex>

                <v-flex xs1 sm1 md1 lg1><v-card-actions><v-btn icon><v-icon color="blue">info</v-icon></v-btn></v-card-actions></v-flex>

              </v-layout>

          </v-card>

        </v-flex>

        <v-flex xs12 sm6 md5 lg4
            v-for="item in searchResults"
        >

          <v-card >

            <v-card-title>
              <h2 class="headline">{{ item.name }}</h2>
              <span class="grey--text">{{ item.hint }}</span>
            </v-card-title>

            <v-card-text>
              <p><strong>Author:</strong> {{ item.author }}</p>
              <p>{{ item.abstract }}</p>
              <strong>Contains:</strong>
              <ul>
                <li v-for="parts in  item.contains">{{ parts }}</li>
              </ul>
            </v-card-text>

            <v-card-text>

              <p><strong>Related Setting:</strong> {{ item.setting }}</p>
              <p><v-chip v-for="tag in  item.tags">{{ tag }}</v-chip></p>
            </v-card-text>

            <v-card-actions>
              <v-btn color="primary" :href="item.url">Visit the document</v-btn>
            </v-card-actions>

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
      }
    }
  }
</script>

<style scoped lang="css">
  .library {

  }
</style>
