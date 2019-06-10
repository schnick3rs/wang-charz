<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <section class="archetype-selection">

    <v-container grid-list-md>

      <v-layout justify-center row wrap>

        <v-flex xs12 sm10 md8 lg8>


        </v-flex>

        <v-flex xs12 sm10 md8 lg8 v-if="!selectedArchetype">

          <v-card>

            <v-card-text>

              <v-text-field
                      solo
                      placeholder="Search..."
                      v-model="searchQuery"
                      prepend-inner-icon="search"
                      clearable
              ></v-text-field>

            </v-card-text>

          </v-card>

          <v-card>

            <v-card v-if="!loaded" height="50%">
              <v-card-text class="text-xs-center">
                <v-progress-circular indeterminate size="64"></v-progress-circular>
              </v-card-text>
            </v-card>

          </v-card>

          <v-card v-if="loaded">

            <div v-for="(group, key) in archetypeGroups">

              <v-divider></v-divider>

              <v-list subheader v-if="archetypesByGroup(group).length > 0">

                <v-subheader>{{ group }}</v-subheader>

                  <v-list-tile
                          two-line
                          v-for="item in archetypesByGroup(group)"
                          avatar
                          @click="selectedArchetype = item"
                          :disabled="item.species !== characterSpecies"
                  >

                  <v-list-tile-content>
                      <v-list-tile-title>{{item.name}}</v-list-tile-title>
                      <v-list-tile-sub-title>{{item.hint}}</v-list-tile-sub-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                      <v-chip color="green" text-color="white">
                          <v-avatar class="green darken-4">{{item.cost}}</v-avatar>
                          <v-icon>attach_money</v-icon>
                      </v-chip>
                  </v-list-tile-action>
                  <v-list-tile-action>
                      <v-chip color="red" text-color="white">
                          <v-avatar class="red darken-4">{{item.tier}}</v-avatar>
                          <v-icon >account_balance</v-icon>
                      </v-chip>
                  </v-list-tile-action>

                </v-list-tile>

              </v-list>

            </div>
          </v-card>

        </v-flex>

        <v-flex xs12 sm10 md8 lg8 v-if="selectedArchetype">

          <archetype-preview
                  :item="selectedArchetype"
                  :actions="true"
          ></archetype-preview>

        </v-flex>

      </v-layout>

    </v-container>

  </section>

</template>

<script lang="js">
  import ArchetypeRepository from '../mixins/ArchetypeRepositoryMixin';
  import ArchetypePreview from './builder/species/ArchetypePreview';

  export default  {
    name: 'archetype-selection',
    props: [],
    components: { ArchetypePreview },
    mixins: [ ArchetypeRepository ],
    data() {
      return {
        searchQuery: '',
        selectedArchetype: undefined,
      }
    },
    methods: {
      archetypesByGroup(groupName) {
        let archetypes = this.archetypeRepository;

        /* filter by archetype group */
        archetypes = archetypes.filter( a => a.group === groupName );

        /* filter by  */
        if ( this.characterSpecies ) {
          archetypes = archetypes.filter( a => a.species === this.characterSpecies )
        }

        /* filter by search query */
        if ( this.searchQuery ) {
          archetypes = archetypes.filter( a => {
            let lowerCaseArchetype = a.name.toLowerCase();
            let lowerCaseSearchQuery = this.searchQuery.toLowerCase();
            return lowerCaseArchetype.indexOf(lowerCaseSearchQuery) >= 0;
          } );
        }

        return archetypes;
      },
      selectArchetypeForChar(item) {
          this.$store.commit('setArchetype', { value: item.name, cost: item.cost });
      },
    },
    computed: {
      loaded() { return this.archetypeRepository !== undefined; },
      characterSpecies() { return this.$store.getters.species; },
      archetypeList() {

      },
      archetypeGroups: function() {

        if ( this.archetypeRepository !== undefined ) {

          let archetypes = this.archetypeRepository;

          if ( this.characterSpecies !== undefined ) {
            archetypes = archetypes.filter( a => a.species === this.characterSpecies );
          }

          return [...new Set(archetypes.map(item => item.group))]
        }

        return []
      }
    },
    filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    }
}
</script>

<style scoped lang="css">
  .archetype-selection {

  }
</style>
